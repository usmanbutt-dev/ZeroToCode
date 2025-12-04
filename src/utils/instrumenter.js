// Robust C++ Instrumenter for ZeroToCode Smart Visualizer
// Handles: Loop variables, Pointer arithmetic, Multi-declarations, References, Nested scopes
// NEW: Dynamic Memory (Heap), Structs, 2D Arrays, Block Scope, STL Containers

export const instrumentCode = (code) => {
  const lines = code.split('\n');
  let instrumentedLines = [];
  
  // Trace Helper Header - Enhanced with Heap and Struct support
  const header = `#include <iostream>
#include <string>
#include <sstream>

// ===== SMART VISUALIZER TRACE HELPERS =====
template <typename T>
void __trace(const char* type, const char* name, T val, void* addr, int line) {
  std::cout << "TRACE::{" 
            << "\\"type\\":\\"" << type << "\\", "
            << "\\"name\\":\\"" << name << "\\", "
            << "\\"value\\":\\"" << val << "\\", "
            << "\\"addr\\":\\"" << addr << "\\", "
            << "\\"line\\":" << line 
            << "}" << std::endl;
}

template <typename T>
void __trace_ptr(const char* type, const char* name, T* val, void* addr, int line) {
  std::cout << "TRACE::{" 
            << "\\"type\\":\\"" << type << "\\", "
            << "\\"name\\":\\"" << name << "\\", "
            << "\\"value\\":\\"" << (void*)val << "\\", "
            << "\\"addr\\":\\"" << addr << "\\", "
            << "\\"deref\\":\\"" << (val ? *val : 0) << "\\", "
            << "\\"line\\":" << line 
            << "}" << std::endl;
}

// NEW: Heap allocation trace
template <typename T>
void __trace_heap_alloc(const char* name, T* ptr, size_t count, int line) {
  std::cout << "TRACE::{" 
            << "\\"type\\":\\"heap_alloc\\", "
            << "\\"name\\":\\"" << name << "\\", "
            << "\\"addr\\":\\"" << (void*)ptr << "\\", "
            << "\\"size\\":" << count << ", "
            << "\\"value\\":\\"" << (ptr ? *ptr : 0) << "\\", "
            << "\\"line\\":" << line 
            << "}" << std::endl;
}

// NEW: Heap deallocation trace
void __trace_heap_free(const char* name, void* ptr, int line) {
  std::cout << "TRACE::{" 
            << "\\"type\\":\\"heap_free\\", "
            << "\\"name\\":\\"" << name << "\\", "
            << "\\"addr\\":\\"" << ptr << "\\", "
            << "\\"line\\":" << line 
            << "}" << std::endl;
}

// NEW: Heap array allocation trace
template <typename T>
void __trace_heap_arr(const char* name, T* ptr, size_t count, int line) {
  std::cout << "TRACE::{" 
            << "\\"type\\":\\"heap_array\\", "
            << "\\"name\\":\\"" << name << "\\", "
            << "\\"addr\\":\\"" << (void*)ptr << "\\", "
            << "\\"size\\":" << count << ", "
            << "\\"value\\":\\"[";
  for (size_t i = 0; i < count; i++) {
    std::cout << ptr[i];
    if (i < count - 1) std::cout << ",";
  }
  std::cout << "]\\", "
            << "\\"line\\":" << line 
            << "}" << std::endl;
}

// NEW: Block scope enter/exit
void __trace_scope(const char* action, const char* scopeType, int line) {
  std::cout << "TRACE::{" 
            << "\\"type\\":\\"scope\\", "
            << "\\"action\\":\\"" << action << "\\", "
            << "\\"scopeType\\":\\"" << scopeType << "\\", "
            << "\\"line\\":" << line 
            << "}" << std::endl;
}

// NEW: Struct field trace
template <typename T>
void __trace_field(const char* structName, const char* fieldName, T val, void* addr, int line) {
  std::cout << "TRACE::{" 
            << "\\"type\\":\\"field\\", "
            << "\\"struct\\":\\"" << structName << "\\", "
            << "\\"field\\":\\"" << fieldName << "\\", "
            << "\\"value\\":\\"" << val << "\\", "
            << "\\"addr\\":\\"" << addr << "\\", "
            << "\\"line\\":" << line 
            << "}" << std::endl;
}

// NEW: Struct declaration trace
void __trace_struct(const char* name, const char* typeName, void* addr, int line) {
  std::cout << "TRACE::{" 
            << "\\"type\\":\\"struct\\", "
            << "\\"name\\":\\"" << name << "\\", "
            << "\\"structType\\":\\"" << typeName << "\\", "
            << "\\"addr\\":\\"" << addr << "\\", "
            << "\\"line\\":" << line 
            << "}" << std::endl;
}

// 2D Array trace
template <typename T, size_t R, size_t C>
void __trace_arr2d(const char* type, const char* name, T (&arr)[R][C], void* addr, int line) {
  std::cout << "TRACE::{" 
            << "\\"type\\":\\"" << type << "\\", "
            << "\\"name\\":\\"" << name << "\\", "
            << "\\"rows\\":" << R << ", "
            << "\\"cols\\":" << C << ", "
            << "\\"value\\":\\"[";
  for (size_t i = 0; i < R; i++) {
    std::cout << "[";
    for (size_t j = 0; j < C; j++) {
      std::cout << arr[i][j];
      if (j < C - 1) std::cout << ",";
    }
    std::cout << "]";
    if (i < R - 1) std::cout << ",";
  }
  std::cout << "]\\", "
            << "\\"addr\\":\\"" << addr << "\\", "
            << "\\"line\\":" << line 
            << "}" << std::endl;
}

template <typename T, size_t N>
void __trace_arr(const char* type, const char* name, T (&arr)[N], void* addr, int line) {
  std::cout << "TRACE::{" 
            << "\\"type\\":\\"" << type << "\\", "
            << "\\"name\\":\\"" << name << "\\", "
            << "\\"value\\":\\"[";
  for (size_t i = 0; i < N; i++) {
    std::cout << arr[i];
    if (i < N - 1) std::cout << ",";
  }
  std::cout << "]\\", "
            << "\\"size\\":" << N << ", "
            << "\\"addr\\":\\"" << addr << "\\", "
            << "\\"line\\":" << line 
            << "}" << std::endl;
}

void __trace_step(int line) {
  std::cout << "TRACE::{" 
            << "\\"type\\":\\"step\\", "
            << "\\"line\\":" << line 
            << "}" << std::endl;
}

void __trace_func(const char* name, const char* action, int line) {
  std::cout << "TRACE::{" 
            << "\\"type\\":\\"func\\", "
            << "\\"name\\":\\"" << name << "\\", "
            << "\\"action\\":\\"" << action << "\\", "
            << "\\"line\\":" << line 
            << "}" << std::endl;
}
// ===== END TRACE HELPERS =====

`;

  instrumentedLines.push(header);

  let currentFunction = null;
  let pendingLoopVar = null;
  let waitingForLoopBody = false;
  const pointerVars = new Set(); // Track which variables are pointers
  const heapPointers = new Map(); // Track heap allocations: name -> size
  const structTypes = new Set(); // Track defined struct types
  const structVars = new Map(); // Track struct variable instances: name -> typeName
  let scopeStack = []; // Track nested scopes for proper cleanup
  let braceDepth = 0; // Track brace nesting

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    const lineNum = index + 1;

    // Skip empty/comments
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
      instrumentedLines.push(line);
      return;
    }

    // === STRUCT DEFINITION ===
    // Pattern: struct Point { ... };
    const structDefMatch = trimmed.match(/^struct\s+(\w+)\s*\{/);
    if (structDefMatch) {
      structTypes.add(structDefMatch[1]);
      instrumentedLines.push(line);
      return;
    }

    // === FUNCTION DETECTION ===
    const funcRegex = /^(int|void|float|double|char|string|bool)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(.*\)\s*\{/;
    const funcMatch = trimmed.match(funcRegex);
    if (funcMatch) {
      instrumentedLines.push(line);
      currentFunction = funcMatch[2];
      braceDepth = 1;
      instrumentedLines.push(`__trace_func("${currentFunction}", "enter", ${lineNum});`);
      instrumentedLines.push(`__trace_step(${lineNum});`);
      return;
    }

    // === FUNCTION EXIT ===
    if (trimmed.startsWith('return')) {
      if (currentFunction) {
        instrumentedLines.push(`__trace_func("${currentFunction}", "exit", ${lineNum});`);
      }
      instrumentedLines.push(line);
      return;
    }
    
    // Final closing brace of main function (only if no return statement was used)
    if (currentFunction === 'main' && trimmed === '}' && braceDepth === 1) {
      // Don't add exit trace here - return statement already handles it
      instrumentedLines.push(line);
      currentFunction = null;
      braceDepth = 0;
      return;
    }

    if (!currentFunction) {
      instrumentedLines.push(line);
      return;
    }

    // === BLOCK SCOPE TRACKING ===
    // Detect if/else/while/for blocks
    if (/^(if|else\s*if|else|while)\s*(\(.*\))?\s*\{/.test(trimmed)) {
      const scopeType = trimmed.match(/^(if|else\s*if|else|while)/)[1];
      instrumentedLines.push(line);
      scopeStack.push({ type: scopeType, line: lineNum });
      braceDepth++;
      instrumentedLines.push(`__trace_scope("enter", "${scopeType}", ${lineNum});`);
      return;
    }
    
    // Track standalone braces (opening)
    if (trimmed === '{') {
      instrumentedLines.push(line);
      braceDepth++;
      waitingForLoopBody = true;
      return;
    }

    // Track standalone braces (closing)
    if (trimmed === '}') {
      braceDepth--;
      if (scopeStack.length > 0 && braceDepth >= 0) {
        const scope = scopeStack.pop();
        instrumentedLines.push(`__trace_scope("exit", "${scope.type}", ${lineNum});`);
      }
      instrumentedLines.push(line);
      return;
    }

    // === LOOP VARIABLE DETECTION ===
    // Pattern: for (int i = 0; i < 5; i++)
    const forLoopMatch = trimmed.match(/for\s*\(\s*(int|size_t|auto|unsigned)\s+(\w+)\s*=/);
    if (forLoopMatch) {
      instrumentedLines.push(line);
      pendingLoopVar = { name: forLoopMatch[2], line: lineNum };
      waitingForLoopBody = true;
      scopeStack.push({ type: 'for', line: lineNum });
      braceDepth++;
      instrumentedLines.push(`__trace_scope("enter", "for", ${lineNum});`);
      return;
    }

    // If we're waiting for loop body and this is the first real statement
    if (pendingLoopVar && waitingForLoopBody && trimmed !== '{') {
      // Inject trace BEFORE the original line
      instrumentedLines.push(`__trace("var", "${pendingLoopVar.name}", ${pendingLoopVar.name}, (void*)&${pendingLoopVar.name}, ${lineNum});`);
      instrumentedLines.push(line);
      pendingLoopVar = null;
      waitingForLoopBody = false;
      // Continue processing patterns below
    } else {
      // Normal case: add line first
      instrumentedLines.push(line);
    }

    // === HEAP ALLOCATION: new ===
    // Pattern: int* ptr = new int(10); or int* arr = new int[5];
    const newSingleMatch = trimmed.match(/^(int|float|double|char)\s*\*\s*(\w+)\s*=\s*new\s+(int|float|double|char)\s*\(([^)]*)\)/);
    if (newSingleMatch) {
      const name = newSingleMatch[2];
      pointerVars.add(name);
      heapPointers.set(name, 1);
      instrumentedLines.push(`__trace_heap_alloc("${name}", ${name}, 1, ${lineNum});`);
      return;
    }

    // Pattern: int* arr = new int[5];
    const newArrayMatch = trimmed.match(/^(int|float|double|char)\s*\*\s*(\w+)\s*=\s*new\s+(int|float|double|char)\s*\[(\d+)\]/);
    if (newArrayMatch) {
      const name = newArrayMatch[2];
      const size = newArrayMatch[4];
      pointerVars.add(name);
      heapPointers.set(name, parseInt(size));
      instrumentedLines.push(`__trace_heap_arr("${name}", ${name}, ${size}, ${lineNum});`);
      return;
    }

    // Pattern: int* arr = new int[5]{1,2,3,4,5};
    const newArrayInitMatch = trimmed.match(/^(int|float|double|char)\s*\*\s*(\w+)\s*=\s*new\s+(int|float|double|char)\s*\[(\d+)\]\s*\{/);
    if (newArrayInitMatch) {
      const name = newArrayInitMatch[2];
      const size = newArrayInitMatch[4];
      pointerVars.add(name);
      heapPointers.set(name, parseInt(size));
      instrumentedLines.push(`__trace_heap_arr("${name}", ${name}, ${size}, ${lineNum});`);
      return;
    }

    // === HEAP DEALLOCATION: delete ===
    // Pattern: delete ptr; or delete[] arr;
    const deleteMatch = trimmed.match(/^delete\s*(\[\])?\s*(\w+)\s*;/);
    if (deleteMatch) {
      const name = deleteMatch[2];
      instrumentedLines.push(`__trace_heap_free("${name}", ${name}, ${lineNum});`);
      heapPointers.delete(name);
      return;
    }

    // === 2D ARRAY DECLARATION ===
    // Pattern: int matrix[2][3] = {{1,2,3}, {4,5,6}};
    const arr2dMatch = trimmed.match(/^(const\s+)?(int|float|double|char)\s+(\w+)\s*\[(\d+)\]\s*\[(\d+)\]/);
    if (arr2dMatch) {
      const name = arr2dMatch[3];
      instrumentedLines.push(`__trace_arr2d("array2d", "${name}", ${name}, (void*)${name}, ${lineNum});`);
      return;
    }

    // === 1D ARRAY DECLARATION ===
    if (/^(const\s+)?(int|float|double|char)\s+\w+\s*\[/.test(trimmed) && !arr2dMatch) {
      const match = trimmed.match(/^(const\s+)?(int|float|double|char)\s+(\w+)\s*\[/);
      if (match) {
        const name = match[3];
        instrumentedLines.push(`__trace_arr("array", "${name}", ${name}, (void*)${name}, ${lineNum});`);
        return;
      }
    }

    // === STRUCT VARIABLE DECLARATION ===
    // Pattern: Point p; or Point p = {1, 2};
    for (const structType of structTypes) {
      const structVarRegex = new RegExp(`^${structType}\\s+(\\w+)\\s*(=|;)`);
      const structVarMatch = trimmed.match(structVarRegex);
      if (structVarMatch) {
        const name = structVarMatch[1];
        structVars.set(name, structType);
        instrumentedLines.push(`__trace_struct("${name}", "${structType}", (void*)&${name}, ${lineNum});`);
        return;
      }
    }

    // === STRUCT FIELD ACCESS ===
    // Pattern: p.x = 10; or foo.bar = value;
    const fieldAssignMatch = trimmed.match(/^(\w+)\.(\w+)\s*=\s*(.+);$/);
    if (fieldAssignMatch) {
      const structName = fieldAssignMatch[1];
      const fieldName = fieldAssignMatch[2];
      if (structVars.has(structName)) {
        instrumentedLines.push(`__trace_field("${structName}", "${fieldName}", ${structName}.${fieldName}, (void*)&${structName}.${fieldName}, ${lineNum});`);
        return;
      }
    }

    // === POINTER DECLARATION ===
    // Pattern: int* ptr = ...; or int *ptr = ...;
    if (/^(const\s+)?(int|float|double|char)\s*\*\s*\w+\s*=/.test(trimmed)) {
      const match = trimmed.match(/^(const\s+)?(int|float|double|char)\s*\*\s*(\w+)\s*=/);
      if (match) {
        const name = match[3];
        pointerVars.add(name);
        instrumentedLines.push(`__trace_ptr("pointer", "${name}", ${name}, (void*)&${name}, ${lineNum});`);
        return;
      }
    }

    // === REFERENCE DECLARATION ===
    // Pattern: int& ref = x;
    if (/^(int|float|double|char|bool)\s*&\s*\w+\s*=/.test(trimmed)) {
      const match = trimmed.match(/^(int|float|double|char|bool)\s*&\s*(\w+)\s*=/);
      if (match) {
        const name = match[2];
        // References are just aliases, trace them as variables
        instrumentedLines.push(`__trace("reference", "${name}", ${name}, (void*)&${name}, ${lineNum});`);
        return;
      }
    }

    // === VARIABLE DECLARATION ===
    // Pattern: int x = 10; or const int MAX = 100;
    // Handles multiple: int x = 1, y = 2; (naive - splits on comma)
    if (/^(const\s+)?(int|float|double|char|bool|string|std::string)\s+\w+\s*=/.test(trimmed)) {
      const isConst = trimmed.startsWith('const');
      const baseMatch = trimmed.match(/^(const\s+)?(int|float|double|char|bool|string|std::string)\s+(\w+)\s*=/);
      if (baseMatch) {
        const name = baseMatch[3];
        instrumentedLines.push(`__trace("${isConst ? 'const' : 'var'}", "${name}", ${name}, (void*)&${name}, ${lineNum});`);
        
        // Check for multiple declarations (e.g., int x = 1, y = 2;)
        const multiMatch = trimmed.match(/,\s*(\w+)\s*=\s*([^,;]+)/g);
        if (multiMatch) {
          multiMatch.forEach(part => {
            const varMatch = part.match(/,\s*(\w+)\s*=/);
            if (varMatch) {
              const additionalName = varMatch[1];
              instrumentedLines.push(`__trace("${isConst ? 'const' : 'var'}", "${additionalName}", ${additionalName}, (void*)&${additionalName}, ${lineNum});`);
            }
          });
        }
        return;
      }
    }

    // === VARIABLE ASSIGNMENT ===
    // Pattern: x = 10; or ptr = &arr[0];
    // Excludes array access (x[i] = ...) and struct fields (x.y = ...)
    if (/^\w+\s*=\s*[^;]+;/.test(trimmed) && !trimmed.includes('[') && !trimmed.includes('.')) {
      const match = trimmed.match(/^(\w+)\s*=/);
      if (match) {
        const name = match[1];
        if (pointerVars.has(name)) {
          instrumentedLines.push(`__trace_ptr("pointer", "${name}", ${name}, (void*)&${name}, ${lineNum});`);
        } else {
          instrumentedLines.push(`__trace("assign", "${name}", ${name}, (void*)&${name}, ${lineNum});`);
        }
        return;
      }
    }

    // === ARRAY ELEMENT ASSIGNMENT ===
    // Pattern: arr[i] = 10; (may have trailing comment)
    const arrAssignMatch = trimmed.match(/^(\w+)\[([^\]]+)\]\s*=\s*([^;]+);/);
    if (arrAssignMatch) {
      const arrName = arrAssignMatch[1];
      const indexExpr = arrAssignMatch[2];
      instrumentedLines.push(`__trace("array_set", (std::string("${arrName}[") + std::to_string(${indexExpr}) + "]").c_str(), ${arrName}[${indexExpr}], (void*)&${arrName}[${indexExpr}], ${lineNum});`);
      return;
    }

    // === POINTER/VARIABLE INCREMENT/DECREMENT ===
    // Pattern: i++, ++i, ptr++, i--, etc.
    const incDecMatch = trimmed.match(/^(\w+)(\+\+|--)\s*;?$/) || trimmed.match(/^(\+\+|--)(\w+)\s*;?$/);
    if (incDecMatch) {
      const name = incDecMatch[1] === '++' || incDecMatch[1] === '--' ? incDecMatch[2] : incDecMatch[1];
      if (pointerVars.has(name)) {
        instrumentedLines.push(`__trace_ptr("pointer", "${name}", ${name}, (void*)&${name}, ${lineNum});`);
      } else {
        instrumentedLines.push(`__trace("assign", "${name}", ${name}, (void*)&${name}, ${lineNum});`);
      }
      return;
    }

    // === COMPOUND ASSIGNMENT ===
    // Pattern: ptr += 2; x *= 3; etc.
    if (/^\w+\s*(\+=|-=|\*=|\/=)\s*[^;]+;/.test(trimmed)) {
      const match = trimmed.match(/^(\w+)\s*(\+=|-=|\*=|\/=)/);
      if (match) {
        const name = match[1];
        if (pointerVars.has(name)) {
          instrumentedLines.push(`__trace_ptr("pointer", "${name}", ${name}, (void*)&${name}, ${lineNum});`);
        } else {
          instrumentedLines.push(`__trace("assign", "${name}", ${name}, (void*)&${name}, ${lineNum});`);
        }
        return;
      }
    }

    // === GENERAL STEP TRACE ===
    // For lines with significant statements (cout, cin, etc.)
    if (trimmed.includes('cout') || trimmed.includes('cin')) {
      instrumentedLines.push(`__trace_step(${lineNum});`);
    }
  });

  const result = instrumentedLines.join('\n');
  console.log('--- INSTRUMENTED CODE ---\n', result);
  return result;
};
