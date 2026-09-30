// Renders the sheet to public/cv-{en,ru}.pdf with the same print CSS as Cmd+P,
// so the download button hands over a file instead of relying on the browser's
// print dialog, which some browsers do not have.
//
// Builds into its own distDir: a build into .next would break a running
// `next dev`. That build rewrites next-env.d.ts to point at its own folder,
// so the file is put back afterwards.
import {spawn, execFileSync} from "node:child_process";
import {readFileSync, writeFileSync} from "node:fs";
import puppeteer from "puppeteer";

const DIST = ".next-pdf";
const PORT = 3999;
const PAGES = [["/", "public/cv-en.pdf"], ["/ru/", "public/cv-ru.pdf"]];
const env = {...process.env, NEXT_DIST_DIR: DIST};

const nextEnv = readFileSync("next-env.d.ts", "utf8");
try {
    execFileSync("node_modules/.bin/next", ["build"], {env, stdio: "inherit"});
} finally {
    writeFileSync("next-env.d.ts", nextEnv);
}

const server = spawn("node_modules/.bin/next", ["start", "-p", String(PORT)], {env, stdio: "ignore"});
const browser = await puppeteer.launch();
try {
    await waitForServer(`http://localhost:${PORT}/`);
    const page = await browser.newPage();
    for (const [path, out] of PAGES) {
        await page.goto(`http://localhost:${PORT}${path}`, {waitUntil: "networkidle0"});
        await page.evaluate(() => document.fonts.ready);
        await page.pdf({path: out, format: "A4", printBackground: true, preferCSSPageSize: true});
        console.log(`pdf: ${out}`);
    }
} finally {
    await browser.close();
    server.kill();
}

async function waitForServer(url) {
    for (let i = 0; i < 60; i++) {
        try {
            if ((await fetch(url)).ok) return;
        } catch {}
        await new Promise((r) => setTimeout(r, 500));
    }
    throw new Error(`pdf: ${url} did not come up in 30s`);
}
