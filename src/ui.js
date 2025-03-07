import { cardValueCodeFromName, isCardValueCodeValid } from "./cards.js";
import { parseHandRank } from "./rank.js";
import { getPhaseFromBoardLength } from "./state.js";
export function isMyTurn() {
    return document.querySelector(".action-signal") !== null;
}
export function parseCard(element) {
    var _a, _b;
    if (!element)
        throw new Error("can't parse card from null element");
    const rawValue = (_a = element.querySelector(".value")) === null || _a === void 0 ? void 0 : _a.textContent;
    const rawSuit = (_b = element.querySelector(".suit")) === null || _b === void 0 ? void 0 : _b.textContent;
    if (!rawValue || !rawSuit)
        throw new Error("can't find value or suit in card element");
    const valueName = rawValue;
    const valueCode = cardValueCodeFromName(valueName);
    if (!isCardValueCodeValid(valueCode))
        throw new Error("invalid card value code: " + rawValue);
    return {
        value: {
            name: valueName,
            code: valueCode,
        },
        suit: rawSuit,
    };
}
export function getHandCards() {
    const cards = document.querySelectorAll(".you-player .card");
    try {
        const firstCard = parseCard(cards[0]);
        const secondCard = parseCard(cards[1]);
        return [firstCard, secondCard];
    }
    catch (err) {
        throw new Error("error parsing hand cards: " + err);
    }
}
export function getBoardCards() {
    const cards = [...document.querySelectorAll(".table-cards .card")];
    try {
        return cards.map(parseCard);
    }
    catch (err) {
        throw new Error("error parsing board cards: " + err);
    }
}
export function getBigBlindValue() {
    var _a;
    return parseInt((_a = document.querySelectorAll(".blind-value .chips-value")[1].textContent) !== null && _a !== void 0 ? _a : "");
}
export function getToCallValue() {
    var _a;
    const callText = (_a = document.querySelector("button.call")) === null || _a === void 0 ? void 0 : _a.textContent;
    if (!callText)
        return 0;
    const lowercasedCallText = callText.toLowerCase();
    if (!lowercasedCallText.includes("call"))
        return 0;
    if (!lowercasedCallText.includes(" "))
        return 0;
    return parseInt(lowercasedCallText.split(" ")[1]);
}
export function getHandRank() {
    var _a, _b;
    const rawRank = (_b = (_a = document.querySelector(".player-hand-message")) === null || _a === void 0 ? void 0 : _a.textContent) !== null && _b !== void 0 ? _b : "";
    return parseHandRank(rawRank);
}
export function getPhase() {
    const boardCardsElements = document.querySelectorAll(".table-cards .card");
    return getPhaseFromBoardLength(boardCardsElements.length);
}
export function getStack() {
    var _a;
    const stackText = (_a = document.querySelector(".table-player.you-player .table-player-stack")) === null || _a === void 0 ? void 0 : _a.textContent;
    return parseInt(stackText !== null && stackText !== void 0 ? stackText : "0");
}
export function getTotalPot() {
    var _a;
    const potText = (_a = document.querySelector(".table-pot-size .add-on .chips-value")) === null || _a === void 0 ? void 0 : _a.textContent;
    return parseInt(potText !== null && potText !== void 0 ? potText : "0");
}
export function getPrevPhasePot() {
    var _a;
    const prevPotText = (_a = document.querySelector(".table-pot-size .main-value .chips-value")) === null || _a === void 0 ? void 0 : _a.textContent;
    return parseInt(prevPotText !== null && prevPotText !== void 0 ? prevPotText : "0");
}
export function getState() {
    const hand = getHandCards();
    const board = getBoardCards();
    return {
        phase: getPhase(),
        handRank: getHandRank(),
        hand,
        board,
        handPlusBoard: [...hand, ...board],
        bigBlind: getBigBlindValue(),
        stack: getStack(),
        pot: getTotalPot(),
        prevPhasePot: getPrevPhasePot(),
        toCall: getToCallValue(),
    };
}
export function canCheck() {
    var _a;
    return !((_a = document.querySelector("button.check")) === null || _a === void 0 ? void 0 : _a.disabled);
}
export function check() {
    var _a;
    (_a = document.querySelector("button.check")) === null || _a === void 0 ? void 0 : _a.click();
}
export function fold() {
    var _a;
    (_a = document.querySelector("button.fold")) === null || _a === void 0 ? void 0 : _a.click();
}
export function call() {
    var _a;
    (_a = document.querySelector("button.call")) === null || _a === void 0 ? void 0 : _a.click();
}
function withRaiseMenu(action) {
    const raiseButton = document.querySelector("button.raise");
    if (raiseButton.disabled) {
        call();
        action();
        return;
    }
    raiseButton.click();
    setTimeout(() => {
        var _a;
        action();
        (_a = document.querySelector('.raise-controller-form input[type="submit"]')) === null || _a === void 0 ? void 0 : _a.click();
    }, 100);
}
function getBetButtons() {
    const buttons = document.querySelectorAll(".default-bet-buttons button");
    console.log("bet buttons", buttons);
    return buttons;
}
export function minRaise(callback) {
    withRaiseMenu(() => {
        var _a;
        (_a = getBetButtons()[0]) === null || _a === void 0 ? void 0 : _a.click();
        callback === null || callback === void 0 ? void 0 : callback();
    });
}
export function halfPotRaise(callback) {
    withRaiseMenu(() => {
        var _a;
        (_a = getBetButtons()[1]) === null || _a === void 0 ? void 0 : _a.click();
        callback === null || callback === void 0 ? void 0 : callback();
    });
}
export function tqPotRaise(callback) {
    withRaiseMenu(() => {
        var _a;
        (_a = getBetButtons()[2]) === null || _a === void 0 ? void 0 : _a.click();
        callback === null || callback === void 0 ? void 0 : callback();
    });
}
export function potRaise(callback) {
    withRaiseMenu(() => {
        var _a;
        (_a = getBetButtons()[3]) === null || _a === void 0 ? void 0 : _a.click();
        callback === null || callback === void 0 ? void 0 : callback();
    });
}
export function allInRaise(callback) {
    withRaiseMenu(() => {
        var _a;
        (_a = getBetButtons()[4]) === null || _a === void 0 ? void 0 : _a.click();
        callback === null || callback === void 0 ? void 0 : callback();
    });
}
export function showHandIfPossible() {
    var _a;
    (_a = document.querySelector('button.show-your-hand')) === null || _a === void 0 ? void 0 : _a.click();
}
