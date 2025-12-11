// Robust C++ Instrumenter for ZeroToCode Smart Visualizer
// Handles: Loop variables, Pointer arithmetic, Multi-declarations, References, Nested scopes
// NEW: Dynamic Memory (Heap), Structs, 2D Arrays, Block Scope, Data Types, Source Expressions

export const instrumentCode = (code) => {
  const lines = code.split('\n');
  let instrumentedLines = [];
  
  // Trace Helper Header - Enhanced with dataType and expression tracking
  const header = `#include <iostream>
#include <string>
#include <sstream>

// ===== SMART VISUALIZER TRACE HELPERS =====
// Enhanced with dataType and expr (source expression) parameters
template <typename T>
void __trace(const char* type, const char* name, T val, void* addr, int line, const char* dataType = "", const char* expr = "") {
  std::cout << "TRACE::{" 
            << "\\"type\\":\\"" << type << "\\", "
            << "\\"name\\":\\"" << name << "\\", "
            << "\\"value\\":\\"" << val << "\\", "
            << "\\"addr\\":\\"" << addr << "\\", "
            << "\\"line\\":" << line << ", "
            << "\\"dataType\\":\\"" << dataType << "\\", "
            << "\\"expr\\":\\"" << expr << "\\""
            << "}" << std::endl;
}

template <typename T>
void __trace_ptr(const char* type, const char* name, T* val, void* addr, int line, const char* dataType = "", const char* expr = "") {
  std::cout << "TRACE::{" 
            << "\\"type\\":\\"" << type << "\\", "
            << "\\"name\\":\\"" << name << "\\", "
            << "\\"value\\":\\"" << (void*)val << "\\", "
            << "\\"addr\\":\\"" << addr << "\\", "
            << "\\"deref\\":\\"" << (val ? *val : 0) << "\\", "
            << "\\"line\\":" << line << ", "
            << "\\"dataType\\":\\"" << dataType << "\\", "
            << "\\"expr\\":\\"" << expr << "\\""
            << "}" << std::endl;
}

// Heap allocation trace
template <typename T>
void __trace_heap_alloc(const char* name, T* ptr, size_t count, int line, const char* dataType = "") {
  std::cout << "TRACE::{" 
            << "\\"type\\":\\"heap_alloc\\", "
            << "\\"name\\":\\"" << name << "\\", "
            << "\\"addr\\":\\"" << (void*)ptr << "\\", "
            << "\\"size\\":" << count << ", "
            << "\\"value\\":\\"" << (ptr ? *ptr : 0) << "\\", "
            << "\\"line\\":" << line << ", "
            << "\\"dataType\\":\\"" << dataType << "\\""
            << "}" << std::endl;
}

// Heap deallocation trace
void __trace_heap_free(const char* name, void* ptr, int line) {
  std::cout << "TRACE::{" 
            << "\\"type\\":\\"heap_free\\", "
            << "\\"name\\":\\"" << name << "\\", "
            << "\\"addr\\":\\"" << ptr << "\\", "
            << "\\"line\\":" << line 
            << "}" << std::endl;
}

// Heap array allocation trace
template <typename T>
void __trace_heap_arr(const char* name, T* ptr, size_t count, int line, const char* dataType = "") {
  std::cout << "TRACE::{" 
            << "\\"type\\":\\"heap_array\\", "
            << "\\"name\\":\\"" << name << "\\", "
            << "\\"addr\\":\\"" << (void*)ptr << "\\", "
            << "\\"size\\":" << count << ", "
            << "\\"dataType\\":\\"" << dataType << "\\", "
            << "\\"value\\":\\"[";
  for (size_t i = 0; i < count; i++) {
    std::cout << ptr[i];
    if (i < count - 1) std::cout << ",";
  }
  std::cout << "]\\", "
            << "\\"line\\":" << line 
            << "}" << std::endl;
}

// Block scope enter/exit
void __trace_scope(const char* action, const char* scopeType, int line) {
  std::cout << "TRACE::{" 
            << "\\"type\\":\\"scope\\", "
            << "\\"action\\":\\"" << action << "\\", "
            << "\\"scopeType\\":\\"" << scopeType << "\\", "
            << "\\"line\\":" << line 
            << "}" << std::endl;
}

// Struct field trace
template <typename T>
void __trace_field(const char* structName, const char* fieldName, T val, void* addr, int line, const char* dataType = "", const char* expr = "") {
  std::cout << "TRACE::{" 
            << "\\"type\\":\\"field\\", "
            << "\\"struct\\":\\"" << structName << "\\", "
            << "\\"field\\":\\"" << fieldName << "\\", "
            << "\\"value\\":\\"" << val << "\\", "
            << "\\"addr\\":\\"" << addr << "\\", "
            << "\\"line\\":" << line << ", "
            << "\\"dataType\\":\\"" << dataType << "\\", "
            << "\\"expr\\":\\"" << expr << "\\""
            << "}" << std::endl;
}

// Struct declaration trace
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
void __trace_arr2d(const char* type, const char* name, T (&arr)[R][C], void* addr, int line, const char* dataType = "") {
  std::cout << "TRACE::{" 
            << "\\"type\\":\\"" << type << "\\", "
            << "\\"name\\":\\"" << name << "\\", "
            << "\\"rows\\":" << R << ", "
            << "\\"cols\\":" << C << ", "
            << "\\"dataType\\":\\"" << dataType << "\\", "
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

// 1D Array trace
template <typename T, size_t N>
void __trace_arr(const char* type, const char* name, T (&arr)[N], void* addr, int line, const char* dataType = "") {
  std::cout << "TRACE::{" 
            << "\\"type\\":\\"" << type << "\\", "
            << "\\"name\\":\\"" << name << "\\", "
            << "\\"dataType\\":\\"" << dataType << "\\", "
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
  
  // NEW: Track declared variables with their types for assignments
  const declaredVars = new Map(); // name -> { type: string, isPointer: boolean }

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
      const loopType = forLoopMatch[1];
      const loopVar = forLoopMatch[2];
      instrumentedLines.push(line);
      pendingLoopVar = { name: loopVar, type: loopType, line: lineNum };
      declaredVars.set(loopVar, { type: loopType, isPointer: false });
      waitingForLoopBody = true;
      scopeStack.push({ type: 'for', line: lineNum });
      braceDepth++;
      instrumentedLines.push(`__trace_scope("enter", "for", ${lineNum});`);
      return;
    }

    // If we're waiting for loop body and this is the first real statement
    if (pendingLoopVar && waitingForLoopBody && trimmed !== '{') {
      // Inject trace BEFORE the original line with type info
      instrumentedLines.push(`__trace("var", "${pendingLoopVar.name}", ${pendingLoopVar.name}, (void*)&${pendingLoopVar.name}, ${lineNum}, "${pendingLoopVar.type}", "");`);
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
    // Pattern: int x = 10; or int x; or const int MAX = 100;
    // Handles multiple: int x = 1, y = 2; or int x, y;
    // Removed !trimmed.includes('(') to allow comments with parens
    if (/^(const\s+)?(int|float|double|char|bool|string|std::string)\s+\w+/.test(trimmed)) {
      const isConst = trimmed.startsWith('const');
      // Updated regex to make assignment optional and allow trailing comments
      // Matches: type name [= value]; ...
      const baseMatch = trimmed.match(/^(const\s+)?(int|float|double|char|bool|string|std::string)\s+(\w+)(\s*=\s*([^;]+))?;/);
      
      if (baseMatch) {
        const dataType = baseMatch[2];
        const name = baseMatch[3];
        const hasInit = !!baseMatch[4];
        const expr = hasInit ? baseMatch[5].trim() : "";
        
        // Track the variable for later assignments
        declaredVars.set(name, { type: dataType, isPointer: false });
        
        // Escape quotes in expression for C++ string
        const escapedExpr = expr.replace(/"/g, '\\"');
        
        // Trace declaration immediately
        instrumentedLines.push(`__trace("${isConst ? 'const' : 'var'}", "${name}", ${name}, (void*)&${name}, ${lineNum}, "${dataType}", "${escapedExpr}");`);
        
        // Check for multiple declarations (e.g., int x = 1, y = 2; or int x, y;)
        // We look for commas followed by a variable name
        const multiParts = trimmed.split(',');
        if (multiParts.length > 1) {
             // Skip the first part which is already handled above "int x"
             for(let i=1; i < multiParts.length; i++) {
                 // Clean up the part: " y = 2;" or " y;"
                 const part = multiParts[i].trim();
                 // Extract name and optional init
                 const partMatch = part.match(/^(\w+)(\s*=\s*([^,;]+))?/);
                 if (partMatch) {
                     const additionalName = partMatch[1];
                     const additionalExpr = partMatch[3] ? partMatch[3].trim().replace(/"/g, '\\"') : "";
                     declaredVars.set(additionalName, { type: dataType, isPointer: false });
                     instrumentedLines.push(`__trace("${isConst ? 'const' : 'var'}", "${additionalName}", ${additionalName}, (void*)&${additionalName}, ${lineNum}, "${dataType}", "${additionalExpr}");`);
                 }
             }
        }
        return;
      }
    }

    // === VARIABLE ASSIGNMENT ===
    // Pattern: x = 10; or sum = sum + arr[i]; or ptr = &arr[0];
    // Only excludes when LHS has array access (x[i] = ...) or struct field (x.y = ...)
    const simpleAssignMatch = trimmed.match(/^(\w+)\s*=\s*([^;]+);/);
    if (simpleAssignMatch) {
      const name = simpleAssignMatch[1];
      const expr = simpleAssignMatch[2].trim();
      // Only exclude if LHS itself is array access or field access
      // RHS can contain anything (including arr[i])
      if (!trimmed.match(/^\w+\s*\[/) && !trimmed.match(/^\w+\s*\./)) {
        // Look up type from declaredVars
        const varInfo = declaredVars.get(name);
        const dataType = varInfo ? varInfo.type : '';
        const escapedExpr = expr.replace(/"/g, '\\"');
        if (pointerVars.has(name)) {
          instrumentedLines.push(`__trace_ptr("pointer", "${name}", ${name}, (void*)&${name}, ${lineNum}, "${dataType}*", "${escapedExpr}");`);
        } else {
          instrumentedLines.push(`__trace("assign", "${name}", ${name}, (void*)&${name}, ${lineNum}, "${dataType}", "${escapedExpr}");`);
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
      const valueExpr = arrAssignMatch[3].trim().replace(/"/g, '\\"');
      instrumentedLines.push(`__trace("array_set", (std::string("${arrName}[") + std::to_string(${indexExpr}) + "]").c_str(), ${arrName}[${indexExpr}], (void*)&${arrName}[${indexExpr}], ${lineNum}, "", "${valueExpr}");`);
      return;
    }

    // === POINTER/VARIABLE INCREMENT/DECREMENT ===
    // Pattern: i++, ++i, ptr++, i--, etc.
    const incDecMatch = trimmed.match(/^(\w+)(\+\+|--)\s*;?$/) || trimmed.match(/^(\+\+|--)(\w+)\s*;?$/);
    if (incDecMatch) {
      let name, op;
      if (incDecMatch[1] === '++' || incDecMatch[1] === '--') {
        op = incDecMatch[1];
        name = incDecMatch[2];
      } else {
        name = incDecMatch[1];
        op = incDecMatch[2];
      }
      const varInfo = declaredVars.get(name);
      const dataType = varInfo ? varInfo.type : '';
      const exprShown = `${name}${op}`;
      if (pointerVars.has(name)) {
        instrumentedLines.push(`__trace_ptr("pointer", "${name}", ${name}, (void*)&${name}, ${lineNum}, "${dataType}*", "${exprShown}");`);
      } else {
        instrumentedLines.push(`__trace("assign", "${name}", ${name}, (void*)&${name}, ${lineNum}, "${dataType}", "${exprShown}");`);
      }
      return;
    }

    // === COMPOUND ASSIGNMENT ===
    // Pattern: sum += arr[i]; x *= 3; ptr += 2; etc.
    // Allow compound assignments even when RHS has array access
    const compoundMatch = trimmed.match(/^(\w+)\s*(\+=|-=|\*=|\/=|%=)\s*([^;]+);/);
    if (compoundMatch) {
      const name = compoundMatch[1];
      const op = compoundMatch[2];
      const rhs = compoundMatch[3].trim();
      const fullExpr = `${name} ${op} ${rhs}`.replace(/"/g, '\\"');
      const varInfo = declaredVars.get(name);
      const dataType = varInfo ? varInfo.type : '';
      if (pointerVars.has(name)) {
        instrumentedLines.push(`__trace_ptr("pointer", "${name}", ${name}, (void*)&${name}, ${lineNum}, "${dataType}*", "${fullExpr}");`);
      } else {
        instrumentedLines.push(`__trace("assign", "${name}", ${name}, (void*)&${name}, ${lineNum}, "${dataType}", "${fullExpr}");`);
      }
      return;
    }

    // === COUT/CIN OUTPUT TRACE ===
    // Trace before cout/cin so output appears after this trace event
    if (trimmed.includes('cout') || trimmed.includes('cin')) {
      // Insert trace BEFORE the cout line (important for ordering)
      const lastLine = instrumentedLines.pop(); // Remove the line we just added
      instrumentedLines.push(`__trace("cout", "", "", nullptr, ${lineNum}, "", "");`);
      instrumentedLines.push(lastLine); // Re-add the original line
      
      // NEW: Capture CIN input into variables
      // Pattern: cin >> x; or std::cin >> x;
      // Also handles chained: cin >> x >> y;
      if (trimmed.includes('cin')) {
         // Use global regex to match all occurrences of >> var
         const extractVarsRegex = />>\s*(\w+)/g;
         let match;
         while ((match = extractVarsRegex.exec(trimmed)) !== null) {
             const varName = match[1];
             const varInfo = declaredVars.get(varName);
             const dataType = varInfo ? varInfo.type : '';
             // Trace ASSIGNMENT *after* the cin line executes
             instrumentedLines.push(`__trace("assign", "${varName}", ${varName}, (void*)&${varName}, ${lineNum}, "${dataType}", "cin >> ${varName}");`);
         }
      }
    }
  });

  const result = instrumentedLines.join('\n');
  console.log('--- INSTRUMENTED CODE ---\n', result);
  return result;
};
