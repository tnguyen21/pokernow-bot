import { FlushRank, FullHouseRank, HighCardRank, PairRank, StraightRank, ThreeOfKindRank, TwoPairRank } from "../../rank.js";
import { PreflopPhase } from "../../state.js";
import { flushAction } from "./flushAction.js";
import { bestHandAction, bluffHandAction } from "./handActions.js";
import { highCardAction } from "./highCardAction.js";
import { pairAction } from "./pairAction.js";
import { preflopAction } from "./preflopActions.js";
import { straightAction } from "./straightAction.js";
import { threeAction } from "./threeAction.js";
import { twoPairAction } from "./twoPairAction.js";
export function ifThenElseAction(state) {
    if (state.phase === PreflopPhase)
        return preflopAction(state);
    else if (state.handRank.code >= FullHouseRank.code)
        return bestHandAction(state);
    switch (state.handRank) {
        case HighCardRank:
            return highCardAction(state);
        case PairRank:
            return pairAction(state);
        case TwoPairRank:
            return twoPairAction(state);
        case ThreeOfKindRank:
            return threeAction(state);
        case StraightRank:
            return straightAction(state);
        case FlushRank:
            return flushAction(state);
        default:
            return bluffHandAction(state);
    }
}
