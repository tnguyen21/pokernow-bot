import { getAction } from "./ai/ai.js";
// import { isMyTurn, showHandIfPossible } from "./ui.js";
const timeoutMs = 500;
let botLoopTimeout;
// console.log(`"pokerbot v${chrome.runtime.getManifest().version}"`);

// function startBotLoop() {
//     stopBotLoop();
//     console.log("starting bot");
//     console.log("big blind: " + getBigBlindValue());
//     function botLoop() {
//         if (isMyTurn()) {
//             console.log("bot turn");
//             const state = getState();
//             console.log("state: ", state);
//             let action: Action | undefined;
//             try {
//                 action = getAction(state);
//                 console.log("bot action:", action);
//             }
//             catch (err) {
//                 action = undefined;
//                 console.error("bot error:", err);
//             }
//             const sanitizedAction = sanitizeAction(action, state);
//             console.log("sanitized bot action:", sanitizedAction);
//             performAction(sanitizedAction, () => setTimeout(botLoop, timeoutMs));
//         }
//         else {
//             botLoopTimeout = setTimeout(botLoop, timeoutMs);
//         }
//         showHandIfPossible();
//     }
//     botLoop();
// }

function startBotLoop() {
    stopBotLoop();
    console.log("starting bot");
    function botLoop() {
        console.log("bot turn");
        let state = {
            "phase": {
                "name": "preflop",
                "code": 0
            },
            "handRank": {
                "name": "high",
                "code": 0
            },
            "hand": [
                {
                    "value": {
                        "name": "4",
                        "code": 4
                    },
                    "suit": "s"
                },
                {
                    "value": {
                        "name": "Q",
                        "code": 12
                    },
                    "suit": "d"
                }
            ],
            "board": [],
            "handPlusBoard": [
                {
                    "value": {
                        "name": "4",
                        "code": 4
                    },
                    "suit": "s"
                },
                {
                    "value": {
                        "name": "Q",
                        "code": 12
                    },
                    "suit": "d"
                }
            ],
            "bigBlind": 20,
            "stack": 1000,
            "pot": 90,
            "prevPhasePot": 0,
            "toCall": 20
        };
        console.log("state: ", state);
        try {
            let action = getAction(state);
            console.log("bot action:", action);
        }
        catch (err) {
            // action = undefined;
            console.error("bot error:", err);
        }
        // const sanitizedAction = sanitizeAction(action, state);
        // console.log("sanitized bot action:", sanitizedAction);
        // performAction(sanitizedAction, () => setTimeout(botLoop, timeoutMs));
        // showHandIfPossible();
    }
    botLoop();
}

function stopBotLoop() {
    clearTimeout(botLoopTimeout);
    botLoopTimeout = undefined;
}
// chrome.runtime.onMessage.addListener((message: ChromeMessage, sender, callback) => {
//     switch (message) {
//         case "start_bot":
//             startBotLoop();
//             break;
//         case "kill_bot":
//             stopBotLoop();
//             break;
//         case "get_bot_status":
//             let status: any = botLoopTimeout === undefined
//                 ? "off"
//                 : "playing"
//             ;
//             callback(status);
//             break;
//     }
// });

startBotLoop();
