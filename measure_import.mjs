const start = Date.now();
console.log("Importing ast.ts...");
import("./src/lib/ast.ts").then(() => {
  const end = Date.now();
  console.log(`Import took ${end - start}ms`);
}).catch(err => {
  console.error("Import failed:", err);
});
