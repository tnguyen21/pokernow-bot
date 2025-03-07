import { PreflopPhase } from "../state.js";
import { findBestGapStraight, getPairs, isOneCardFlushPossible, isOneCardStraightPossible, isOpenEndedStraightPresent } from "./aiUtils.js";
import { ifThenElseAction } from "./ifThenElse/ifThenElseAi.js";
export function getAction(state) {
    if (state.phase.code > PreflopPhase.code) {
        console.log("stats", {
            flushDraw: isOneCardFlushPossible(state.handPlusBoard),
            openStraight: isOpenEndedStraightPresent(state.handPlusBoard),
            oneCardFlush: isOneCardFlushPossible(state.board),
            oneCardStraight: isOneCardStraightPossible(state.board),
            bestGapStraight: findBestGapStraight(state.board),
            boardPairs: getPairs(state.board),
        });
    }
    return ifThenElseAction(state);
}
