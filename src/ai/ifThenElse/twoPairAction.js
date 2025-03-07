import { getPairs, isOneCardFlushOrStraightPossible } from "../aiUtils.js";
import { strongHandAction, weakHandAction } from "./handActions.js";
import { highCardAction } from "./highCardAction.js";
import { pairActionIgnoringBoardPair } from "./pairAction.js";
export function twoPairAction(state) {
    const boardPairs = getPairs(state.board);
    if (boardPairs.length !== 0) {
        if (boardPairs.length == 1)
            return pairActionIgnoringBoardPair(state);
        else
            return highCardAction(state);
    }
    if (isOneCardFlushOrStraightPossible(state.board))
        return weakHandAction(state);
    return strongHandAction(state);
}
