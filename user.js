// ==UserScript==
// @name         InfiniteCourses.Org Direct Link Injector
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Intercepts and displays direct download links on InfiniteCourses download pages.
// @match        https://www.infinitecourses.org/*
// @author       rehan dilawar
// @license      MIT
// @icon         https://www.google.com/s2/favicons?domain=infinitecourses.org
// @grant        none
// @updateURL    https://greasyfork.org/scripts/596225/code/script.meta.js
// @downloadURL  https://greasyfork.org/scripts/596225/code/script.user.js
// ==/UserScript==

(function() {
    'use strict';

    const style = document.createElement('style');
    style.innerHTML = `
        .ic-direct-link-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 10px 20px;
            background: rgba(74, 222, 128, 0.15);
            border: 1px solid rgba(74, 222, 128, 0.5);
            border-radius: 25px;
            color: #fff !important;
            text-decoration: none !important;
            font-weight: bold;
            font-size: 14px;
            transition: all 0.2s ease;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(8px);
        }
        .ic-direct-link-btn:hover {
            background: rgba(74, 222, 128, 0.3);
            transform: translateY(-2px) scale(1.05);
            border-color: rgba(74, 222, 128, 0.8);
        }
    `;
    document.head.appendChild(style);

    setInterval(() => {
        if (!window.location.pathname.startsWith('/course/')) return;

        const downloadSection = document.querySelector('.download-section');
        if (!downloadSection) return;

        if (document.getElementById('ic-direct-links-injected')) return;

        const customSection = document.createElement('div');
        customSection.id = 'ic-direct-links-injected';
        customSection.style.cssText = `
            margin-top: 25px;
            padding-top: 20px;
            border-top: 1px dashed rgba(74, 222, 128, 0.4);
            width: 100%;
            text-align: center;
            font-family: ui-sans-serif, system-ui, sans-serif;
            color: #4ade80;
        `;
        customSection.innerHTML = `<b>! Fetching Direct Links...If links dont show here, reload the page silly :)</b>`;
        downloadSection.appendChild(customSection);

        fetch(window.location.href)
            .then(res => res.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const nextDataEl = doc.getElementById('__NEXT_DATA__');

                if (!nextDataEl) {
                    customSection.innerHTML = `<b>L Failed to find link data on this page Y`Y</b>`;
                    return;
                }

                const data = JSON.parse(nextDataEl.textContent);
                const props = data.props?.pageProps?.post || data.props?.pageProps;

                let pixeldrainLinks = [];
                let sendNowLinks = [];
                let otherLinks = [];

                if (props) {
                    ['downloadLink1', 'downloadLink2', 'downloadLink3', 'downloadLink4'].forEach(key => {
                        let links = props[key];
                        if (!links) return;
                        if (!Array.isArray(links)) links = [links];

                        links.forEach(url => {
                            if (!url || typeof url !== 'string') return;
                            if (url.includes('pixeldrain.com')) pixeldrainLinks.push(url);
                            else if (url.includes('send.now')) sendNowLinks.push(url);
                            else otherLinks.push(url);
                        });
                    });
                }

                if (pixeldrainLinks.length === 0 && sendNowLinks.length === 0 && otherLinks.length === 0) {
                    customSection.innerHTML = `<h3 style="font-size: 1.25rem; font-weight: bold; color: #ef4444; margin-bottom: 15px;">No Direct Links Found</h3>`;
                    return;
                }

                const allLinks = { 'Pixeldrain': pixeldrainLinks, 'Send.now': sendNowLinks, 'Other': otherLinks };
                let htmlContent = `<h3 style="text-align: center; font-size: 1.25rem; font-weight: bold; color: #4ade80; margin-bottom: 15px;">! DIRECT DOWNLOADS</h3>`;

                for (const [provider, links] of Object.entries(allLinks)) {
                    if (links.length === 0) continue;

                    htmlContent += `
                        <div style="margin-bottom: 20px;">
                            <h4 style="color: #94a3b8; text-align: center; margin-bottom: 12px; font-size: 0.95rem; text-transform: uppercase; letter-spacing: 1px;">${provider}</h4>
                            <div style="display: flex; flex-wrap: wrap; gap: 12px; justify-content: center;">
                    `;

                    links.forEach((url, index) => {
                        htmlContent += `
                            <a href="${url}" target="_blank" class="ic-direct-link-btn">
                                <svg style="margin-right: 6px;" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                </svg>
                                Part ${index + 1}
                            </a>
                        `;
                    });

                    htmlContent += `</div></div>`;
                }

                customSection.innerHTML = htmlContent;
            })
            .catch(e => {
                console.error('Error fetching course data:', e);
                customSection.innerHTML = `<b>L Network error fetching links :(</b>`;
            });

    }, 500);
})();
