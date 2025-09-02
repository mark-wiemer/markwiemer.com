import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

// turn this from npm script into javascript
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const targetDir = path.join(__dirname, "..", "pages", "politics", "trump-litigation");

try {
    process.chdir(targetDir);
    execSync("npm install", { stdio: "inherit" });
    execSync("npm run build", { stdio: "inherit" });
    console.log("Build completed successfully.");
} catch (err) {
    console.error("Build failed:", err);
    process.exit(1);
}
