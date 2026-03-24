const start = Date.now();
console.log("Importing ast.ts...");
require("./src/lib/ast");
const end = Date.now();
console.log(`Import took ${end - start}ms`);
