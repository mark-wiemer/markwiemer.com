import fs from "fs";
import path from "path";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeRaw from "rehype-raw";

/**
 * Turn all markdown files in this folder
 * into HTML in the `site` folder
 * using remark, remark-rehype, and rehype-stringify.
 * Wrap the contents with `template.html`
 * Ref https://www.npmjs.com/package/remark-html#when-should-i-use-this
 */
async function build() {
    const blogDir = path.dirname(new URL(import.meta.url).pathname);
    const fileNames = fs.readdirSync(blogDir).filter((f) => f.endsWith(".md"));
    const siteDir = path.join(blogDir, "..", "..", "site", "blog");
    console.log(`Building ${fileNames.length} ${fileNames.length === 1 ? "file" : "files"}`);
    const templatePath = path.join(blogDir, "template.html");
    const template = fs.readFileSync(templatePath, "utf8");
    const replace = `<!-- __ARTICLE_CONTENTS__ -->`;
    for (const fileName of fileNames) {
        const filePath = path.join(blogDir, fileName);
        const mdString = fs.readFileSync(filePath, "utf8");
        const htmlBodyString = await remark()
            .use(remarkRehype, { allowDangerousHtml: true })
            .use(rehypeRaw)
            .use(rehypeStringify, { allowDangerousHtml: true })
            .process(mdString);
        const outName = fileName.replace(/\.md$/, ".html").slice("yyyy-mm-dd-".length);
        const outPath = path.join(siteDir, outName);
        const fullHtml = template.replace(replace, htmlBodyString);
        fs.writeFileSync(outPath, String(fullHtml));
        console.log(`Built ${outPath}`);
    }
    console.log("Build complete");
}

build();
