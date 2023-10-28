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
                main: resolve(__dirname, 'index.html'),
                ...pairs,

                // 'about-breed.html': resolve(__dirname, 'html/about-breed.html'),
                // 'about-tcna.html': resolve(__dirname, 'html/about-tcna.html'),
                // 'articles.html': resolve(__dirname, 'html/articles.html'),
                // 'breeder-registration.html': resolve(__dirname, 'html/breeder-registration.html'),
                // 'breeders.html': resolve(__dirname, 'html/breeders.html'),
                // 'events.html': resolve(__dirname, 'html/events.html'),
                // 'membership.html': resolve(__dirname, 'html/membership.html'),
                // 'rescue.html': resolve(__dirname, 'html/rescue.html'),
                // 'voting.html': resolve(__dirname, 'html/voting.html'),

                // 'before-you-buy.html': resolve(__dirname, 'html/articles/before-you-buy.html'),
                // 'meet-kisa-and-zadok.html': resolve(__dirname, 'html/articles/meet-kisa-and-zadok.html'),
                // 'meet-scylla-and-dagon.html': resolve(__dirname, 'html/articles/meet-scylla-and-dagon.html'),
                // 'meet-vin-and-family.html': resolve(__dirname, 'html/articles/meet-vin-and-family.html'),
                // 'unethical-breeding.html': resolve(__dirname, 'html/articles/unethical-breeding.html'),
            },
        },
    },
});