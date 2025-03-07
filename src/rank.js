export const HighCardRank = {
    name: "high",
    code: 0,
};
export const PairRank = {
    name: "pair",
    code: 1,
};
export const TwoPairRank = {
    name: "two_pair",
    code: 2,
};
export const ThreeOfKindRank = {
    name: "three",
    code: 3,
};
export const StraightRank = {
    name: "straight",
    code: 4,
};
export const FlushRank = {
    name: "flush",
    code: 5,
};
export const FullHouseRank = {
    name: "full",
    code: 6,
};
export const FourOfKindRank = {
    name: "four",
    code: 7,
};
export const StraightFlushRank = {
    name: "straight_flush",
    code: 8,
};
export const RoyalFlushRank = {
    name: "royal_flush",
    code: 9,
};
export function parseHandRank(rawRank) {
    const lowercased = rawRank.toLowerCase();
    if (lowercased.includes("high"))
        return HighCardRank;
    else if (lowercased.includes("two"))
        return TwoPairRank;
    else if (lowercased.includes("pair"))
        return PairRank;
    else if (lowercased.includes("three"))
        return ThreeOfKindRank;
    else if (lowercased.includes("flush")) {
        if (lowercased.includes("strai"))
            return StraightFlushRank;
        else if (lowercased.includes("roy"))
            return RoyalFlushRank;
        else
            return FlushRank;
    }
    else if (lowercased.includes("strai"))
        return StraightRank;
    else if (lowercased.includes("four"))
        return FourOfKindRank;
    else if (lowercased.includes("full"))
        return FullHouseRank;
    return HighCardRank;
}
