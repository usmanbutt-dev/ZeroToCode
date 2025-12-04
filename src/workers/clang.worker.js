/* eslint-disable no-restricted-globals */

// Import browsercc from CDN (ES Module)
import { compile } from 'https://cdn.jsdelivr.net/npm/browsercc@0.1.1/dist/index.js';
import { instrumentCode } from '../utils/instrumenter.js';

self.onmessage = async (e) => {
  const { type, payload } = e.data;

  if (type === 'COMPILE_AND_RUN') {
    const { code, input } = payload;

    try {
      self.postMessage({ type: 'STATUS', payload: 'Instrumenting...' });
      
      // Instrument the code
      const instrumentedCode = instrumentCode(code);
      
      self.postMessage({ type: 'STATUS', payload: 'Compiling...' });

      // browsercc's compile function handles Clang + LLD + Sysroot
      const result = await compile({
        source: instrumentedCode,
        fileName: 'main.cpp',
        flags: ['-O2', '-fno-exceptions'],
        extraFiles: {} 
      });

      // Check for compilation errors
      if (!result.module) {
        throw new Error(result.compileOutput || 'Compilation failed with unknown error');
      }

      // Send compiler warnings if any
      if (result.compileOutput && result.compileOutput.trim()) {
        self.postMessage({ type: 'STATUS', payload: 'Compiler Output:\n' + result.compileOutput });
      }

      self.postMessage({ type: 'STATUS', payload: 'Running...' });

      // --- WASI Implementation ---
      // Memory reference - will be set after instantiation
      let memory = null;
      let outputBuffer = "";
      let traceBuffer = [];

      // Helper to get memory as DataView
      const getMemory = () => new DataView(memory.buffer);
      const getMemoryU8 = () => new Uint8Array(memory.buffer);

      // Comprehensive WASI Shim
      const wasiImports = {
        wasi_snapshot_preview1: {
          // File Descriptor Write (stdout/stderr)
          fd_write: (fd, iovs, iovs_len, nwritten) => {
            if (fd === 1 || fd === 2) {
              const view = getMemory();
              let written = 0;
              for (let i = 0; i < iovs_len; i++) {
                const ptr = view.getUint32(iovs + i * 8, true);
                const len = view.getUint32(iovs + i * 8 + 4, true);
                const chunk = new Uint8Array(memory.buffer, ptr, len);
                const text = new TextDecoder().decode(chunk);
                
                // Check for TRACE:: lines
                if (text.includes('TRACE::')) {
                   const lines = text.split('\n');
                   lines.forEach(line => {
                     if (line.startsWith('TRACE::')) {
                       try {
                         const jsonStr = line.replace('TRACE::', '');
                         traceBuffer.push(JSON.parse(jsonStr));
                       } catch (e) {
                         console.error("Failed to parse trace:", line);
                       }
                     } else if (line.trim().length > 0) {
                       // Only add non-empty lines to output
                       outputBuffer += line + '\n';
                     }
                   });
                } else {
                   outputBuffer += text;
                }
                
                written += len;
              }
              view.setUint32(nwritten, written, true);
              return 0;
            }
            return 0;
          },

          // File Descriptor Read (stdin)
          fd_read: (fd, iovs, iovs_len, nread) => {
            if (fd === 0) {
              getMemory().setUint32(nread, 0, true); // EOF
              return 0;
            }
            return 0;
          },

          // File Descriptor Seek
          fd_seek: (fd, offset, whence, newOffset) => 70, // ENOSYS

          // File Descriptor Close
          fd_close: (fd) => 0,

          // File Descriptor Stat Get (for isatty check)
          fd_fdstat_get: (fd, bufPtr) => {
            const view = getMemory();
            view.setUint8(bufPtr, 2); // fs_filetype: character device
            view.setUint16(bufPtr + 2, 0, true); // fs_flags
            view.setBigUint64(bufPtr + 8, BigInt(0), true); // fs_rights_base
            view.setBigUint64(bufPtr + 16, BigInt(0), true); // fs_rights_inheriting
            return 0;
          },

          // Prestat functions (for preopened directories)
          fd_prestat_get: (fd, bufPtr) => 8, // EBADF - no preopened dirs
          fd_prestat_dir_name: (fd, pathPtr, pathLen) => 8, // EBADF

          // Environment Variables
          environ_sizes_get: (environCount, environBufSize) => {
            const view = getMemory();
            view.setUint32(environCount, 0, true);
            view.setUint32(environBufSize, 0, true);
            return 0;
          },
          environ_get: (environ, environBuf) => 0,

          // Command Line Arguments
          args_sizes_get: (argc, argvBufSize) => {
            const view = getMemory();
            view.setUint32(argc, 0, true);
            view.setUint32(argvBufSize, 0, true);
            return 0;
          },
          args_get: (argv, argvBuf) => 0,

          // Process Exit
          proc_exit: (code) => { 
            throw new Error("__WASI_EXIT__:" + code); 
          },

          // Clock Time
          clock_time_get: (id, precision, time) => {
            const view = getMemory();
            const now = BigInt(Date.now()) * BigInt(1000000); // nanoseconds
            view.setBigUint64(time, now, true);
            return 0;
          },

          // Random
          random_get: (buf, bufLen) => {
            const view = getMemoryU8();
            for (let i = 0; i < bufLen; i++) {
              view[buf + i] = Math.floor(Math.random() * 256);
            }
            return 0;
          }
        }
      };

      // Instantiate the WebAssembly module
      let wasmInstance;
      if (result.module instanceof WebAssembly.Module) {
        wasmInstance = await WebAssembly.instantiate(result.module, wasiImports);
      } else {
        // result.module might be raw bytes (Uint8Array or ArrayBuffer)
        const { instance } = await WebAssembly.instantiate(result.module, wasiImports);
        wasmInstance = instance;
      }

      // CRITICAL: Set the memory reference AFTER instantiation
      memory = wasmInstance.exports.memory;

      // Run the program
      try {
        if (wasmInstance.exports._start) {
          wasmInstance.exports._start();
        } else if (wasmInstance.exports.main) {
          wasmInstance.exports.main();
        } else {
          throw new Error("No entry point found (_start or main)");
        }
      } catch (e) {
        // Check if it's a normal exit
        if (e.message && e.message.startsWith("__WASI_EXIT__")) {
          // Normal exit, proceed
        } else {
          throw e;
        }
      }

      self.postMessage({ 
        type: 'OUTPUT', 
        payload: outputBuffer || "Program finished with no output." 
      });
      
      // Send Trace Data
      if (traceBuffer.length > 0) {
        console.log("--- WORKER TRACE BUFFER ---\n", traceBuffer);
        self.postMessage({ type: 'TRACE', payload: traceBuffer });
      } else {
        console.log("--- WORKER: NO TRACE DATA CAPTURED ---");
      }
      
      self.postMessage({ type: 'FINISHED' });

    } catch (err) {
      self.postMessage({ type: 'ERROR', payload: err.message });
    }
  }
};
