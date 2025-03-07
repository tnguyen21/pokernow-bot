import { FlopPhase, RiverPhase } from "../../state.js";
import { hasFlushDrawOrOpenEndedStraight } from "../aiUtils.js";
import { bluffHandAction, strongHandAction, weakHandAction } from "./handActions.js";
export function highCardAction(state) {
    if (state.phase.code < RiverPhase.code) {
        if (hasFlushDrawOrOpenEndedStraight(state.handPlusBoard)) {
            if (state.phase === FlopPhase)
                return strongHandAction(state);
            else // turn
                return weakHandAction(state);
        }
        else {
            return bluffHandAction(state);
        }
    }
    else { // river
        // TODO: se l'avversario ha solo checkato raise more likely
        return bluffHandAction(state);
    }
}
