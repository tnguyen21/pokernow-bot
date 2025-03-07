import { getAvailableFlushValues, getFirstOfSuit, getHighestSuitCount } from "../aiUtils.js";
import { bestHandAction, riskyHandAction, strongHandAction, weakHandAction } from "./handActions.js";
export function flushAction(state) {
    const mostSuitCards = getHighestSuitCount(state.board);
    if (mostSuitCards.length === 3) {
        console.log("flush state", {
            mostSuitCards,
        });
        return bestHandAction(state);
    }
    const availableFlushValues = getAvailableFlushValues(mostSuitCards);
    const myFlushCard = getFirstOfSuit(state.hand, mostSuitCards[0].suit);
    const index = availableFlushValues.indexOf(myFlushCard.value.code);
    console.log("flush state", {
        mostSuitCards,
        availableFlushValues,
        myFlushCard,
        index,
    });
    if (index === availableFlushValues.length - 1)
        return bestHandAction(state);
    if (index === availableFlushValues.length - 2)
        return strongHandAction(state);
    if (index > 4)
        return riskyHandAction(state);
    return weakHandAction(state);
}
