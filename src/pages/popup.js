"use strict";
var _a, _b;
function sendMessage(message, callback) {
    chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
        const currentTabID = tabs.length === 0 ? 0 : tabs[0].id;
        chrome.tabs.sendMessage(currentTabID, message, callback);
    });
}
(_a = document.getElementById("start-bot")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    sendMessage("start_bot");
});
(_b = document.getElementById("kill-bot")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    sendMessage("kill_bot");
});
setInterval(function uiLoop() {
    sendMessage("get_bot_status", (response) => {
        document.getElementById("bot-status").textContent = response;
    });
}, 500);
