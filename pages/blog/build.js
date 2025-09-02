import fs from "fs";
import path from "path";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

/**
 * Turn all markdown files in this folder
 * into HTML in the `site` folder
 * using remark, remark-rehype, and rehype-stringify.
 * Ref https://www.npmjs.com/package/remark-html#when-should-i-use-this
 */
async function build() {
    const blogDir = path.dirname(new URL(import.meta.url).pathname);
    const fileNames = fs.readdirSync(blogDir).filter((f) => f.endsWith(".md"));
    const siteDir = path.join(blogDir, "..", "..", "site", "blog");
    console.log(`Building ${fileNames.length} ${fileNames.length === 1 ? "file" : "files"}`);
    for (const fileName of fileNames) {
        const filePath = path.join(blogDir, fileName);
        const mdString = fs.readFileSync(filePath, "utf8");
        const htmlString = await remark().use(remarkRehype).use(rehypeStringify).process(mdString);
        const outName = fileName.replace(/\.md$/, ".html").slice("yyyy-mm-dd-".length);
        const outPath = path.join(siteDir, outName);
        fs.writeFileSync(outPath, String(htmlString));
        console.log(`Built ${outPath}`);
    }
    console.log("Build complete");
}

build();
