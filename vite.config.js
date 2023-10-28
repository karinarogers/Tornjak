//@ts-check

import fs from 'fs';
import path, { join, resolve } from 'path';
import { defineConfig } from 'vite';

function collectHtmls(folder) {
    const names = fs.readdirSync(folder);
    const rv = [];

    names.forEach((item) => {
        const filename = join(folder, item);
        const st = fs.statSync(filename);

        if (st.isDirectory()) {
            const subfolder = join(folder, item);
            const newRv = collectHtmls(subfolder);
            rv.push(...newRv);
        } else {
            const isHtml = path.extname(filename).toLowerCase() === '.html';
            isHtml && rv.push(filename);
        }
    });

    return rv;
}

const htmlsFolder = join(__dirname, './html');
const ourHtmls = collectHtmls(htmlsFolder);

const pairs = Object.fromEntries(ourHtmls.map((item) => ([path.basename(item), item])));

console.log(pairs);

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                'index.html': resolve(__dirname, 'index.html'),
                ...pairs,
            },
            output: {
                assetFileNames: (info) => {
                    const { name } = info;
                    const ext = path.extname(name || '').substring(1).toLowerCase();
                    const newExt =
                        ext === 'jpg' || ext === 'png' || ext === 'webp'
                            ? 'img'
                            : ext === 'css'
                                ? ''
                                : ext === 'svg'
                                    ? 'svg'
                                    : ext;

                    return `assets/${newExt}/[name]-[hash][extname]`;
                },
                chunkFileNames: (info) => {
                    const { name } = info;
                    //console.log('chunkFileNames', name);
                    return `assets/[name]-[hash].js`;
                },
                entryFileNames: (info) => {
                    const { name: entryName } = info;

                    const { name, ext } = path.parse(entryName);
                    console.log('chunkFileNames', info.name, `assets/${name}-[hash]${ext}`);
                    return `assets/${name}-[hash]${ext}`;
                },
            }
        },
    },
});