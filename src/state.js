export const PreflopPhase = {
    name: "preflop",
    code: 0,
};
export const FlopPhase = {
    name: "flop",
    code: 1,
};
export const TurnPhase = {
    name: "turn",
    code: 2,
};
export const RiverPhase = {
    name: "river",
    code: 3,
};
export function getPhaseFromBoardLength(length) {
    switch (length) {
        case 0:
        default:
            return PreflopPhase;
        case 3:
            return FlopPhase;
        case 4:
            return TurnPhase;
        case 5:
            return RiverPhase;
    }
}
