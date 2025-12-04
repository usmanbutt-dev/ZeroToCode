export const templates = {
  hello: {
    name: "Hello World",
    code: `#include <iostream>

int main() {
  std::cout << "Hello, World!" << std::endl;
  return 0;
}`
  },
  loops: {
    name: "For Loop",
    code: `#include <iostream>

int main() {
  // Print numbers 1 to 5
  for (int i = 1; i <= 5; i++) {
    std::cout << "Count: " << i << std::endl;
  }
  return 0;
}`
  },
  arrays: {
    name: "Arrays",
    code: `#include <iostream>

int main() {
  int numbers[5] = {10, 20, 30, 40, 50};
  
  std::cout << "First element: " << numbers[0] << std::endl;
  std::cout << "Last element: " << numbers[4] << std::endl;
  
  return 0;
}`
  },
  functions: {
    name: "Functions",
    code: `#include <iostream>

// Function to add two numbers
int add(int a, int b) {
  return a + b;
}

int main() {
  int result = add(5, 3);
  std::cout << "5 + 3 = " << result << std::endl;
  return 0;
}`
  },
  pointers: {
    name: "Pointers",
    code: `#include <iostream>

int main() {
  int number = 42;
  int* ptr = &number;
  
  std::cout << "Value: " << number << std::endl;
  std::cout << "Address: " << ptr << std::endl;
  std::cout << "Dereferenced: " << *ptr << std::endl;
  
  return 0;
}`
  }
};
