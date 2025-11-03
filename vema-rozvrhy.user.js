// ==UserScript==
// @name         VEMA rozvrhy
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  Vlastní rozvrhy (D6, D6+, D7, D7+, D10, D10+, N, N+)
// @author       Ondřej Bakan
// @match        https://47557.cloud.vema.cz/VemaWebBridge.dll?Charset=utf-8&App=VemaPortal&Cmd=GetDD&WLink=CentrumCloud47557&DBVApp=DCH&DBVData=HR&DBVRole=Doch%C3%A1zkov%C3%BD%20vedouc%C3%AD&DocID=vm2d0015&DocParams=
// @icon         https://www.google.com/s2/favicons?sz=64&domain=vema.cz
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const replacements = {
        "D6": "62",
        "D7": "60",
        "D10": "63",
        "N": "61",
        "D6+": "68",
        "D7+": "65",
        "D10+": "69",
        "N+": "66"
    };

    function replaceCode(input) {
        const val = input.value.trim();
        if (replacements[val]) {
            input.value = replacements[val];
        }
    }

    // Run replacement when user leaves the field or presses Enter
    document.addEventListener('keydown', function(e) {
        const el = e.target;
        if (el.tagName === 'INPUT' && el.type === 'text') {
            // Pressing Enter triggers replacement
            if (e.key === 'Enter') {
                replaceCode(el);
            }
        }
    });

    document.addEventListener('change', function(e) {
        const el = e.target;
        if (el.tagName === 'INPUT' && el.type === 'text') {
            replaceCode(el);
        }
    });

    document.addEventListener('blur', function(e) {
        const el = e.target;
        if (el.tagName === 'INPUT' && el.type === 'text') {
            replaceCode(el);
        }
    }, true); // capture phase to catch blur correctly
})();
