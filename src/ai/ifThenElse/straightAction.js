import { findBestGapStraight, findBestStraight, isOneCardFlushPossible, isOneCardStraightPossible } from "../aiUtils.js";
import { riskyHandAction, strongHandAction, weakHandAction } from "./handActions.js";
export function straightAction(state) {
    if (isOneCardFlushPossible(state.board))
        return weakHandAction(state);
    const myStraight = findBestStraight(state.handPlusBoard);
    const bestGapStraight = findBestGapStraight(state.board);
    const isBetterStraightPossible = bestGapStraight !== null && myStraight.min.value.code < bestGapStraight.firstPiece.min.value.code;
    if (isBetterStraightPossible)
        return riskyHandAction(state);
    return strongHandAction(state);
}
