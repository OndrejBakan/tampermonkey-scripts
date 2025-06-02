// ==UserScript==
// @name         VEMA bilance
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Shows fund of working hours next to the total worked hours.
// @author       You
// @match        https://47557.cloud.vema.cz/VemaWebBridge.dll?Charset=utf-8&App=VemaPortal&Cmd=GetDD&WLink=CentrumCloud47557&DBVApp=DCH&DBVData=HR&DBVRole=Doch%C3%A1zkov%C3%BD%20vedouc%C3%AD&DocID=vm2d0015&DocParams=
// @icon         https://www.google.com/s2/favicons?sz=64&domain=vema.cz
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function diffDuration(bilance, saldo) {
        const [bilanceHours, bilanceMinutes] = bilance.split(':').map(Number);
        const bilanceInMinutes = bilanceHours * 60 + bilanceMinutes;

        const [saldoHours, saldoMinutes] = saldo.split(':').map(Number);
        const saldoInMinutes = saldoHours * 60 + saldoMinutes;

        let diffInMinutes = bilanceInMinutes - saldoInMinutes;

        // Convert back to hh:mm
        const hours = Math.floor(diffInMinutes / 60);
        const minutes = diffInMinutes % 60;

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    };

    function processRow(row) {

        if (row.dataset.processed === "true") return;

        row.dataset.processed = "true";

        // bilance
        let bilanceCell = row.querySelector("td.field-bilance");
        let bilance = bilanceCell.textContent.trim();

        let saldoCell = row.querySelector("td.field-saldo");
        let saldo = saldoCell.textContent.trim();

        let fond = diffDuration(bilance, saldo)
        console.log("Fond", fond);

        bilanceCell.querySelector("div").append(` (${fond})`);

    };

    function highlightFields() {
        const rows = document.querySelectorAll("div.dgrid-content div.dgrid-row");
        rows.forEach(row => {
            const departmentCell = row.querySelector("td.field-pracv");

            if (departmentCell && departmentCell.textContent.trim() === "50400") {
                processRow(row);
            }
        });
    }

    // Run on load
    highlightFields();

    // Optional: watch for dynamically added elements
    var observer = new MutationObserver(() => {
        highlightFields();
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
