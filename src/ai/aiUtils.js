import { AceCode, LowestStraightAceCode } from "../cards.js";
export function isOneCardFlushOrStraightPossible(cards) {
    return isOneCardFlushPossible(cards) || isOneCardStraightPossible(cards);
}
export function hasFlushDrawOrOpenEndedStraight(cards) {
    return isOneCardFlushPossible(cards) || isOpenEndedStraightPresent(cards);
}
/**
 * Is only one more card needed for a flush?
 * In other words returns if there are four cards of the same suit.
 */
export function isOneCardFlushPossible(cards) {
    const counts = {};
    for (const c of cards) {
        if (!counts[c.suit])
            counts[c.suit] = 1;
        else
            counts[c.suit] += 1;
    }
    for (const suit in counts)
        if (counts[suit] === 4)
            return true;
    return false;
}
/**
 * Is only one more card needed for a straight?
 */
export function isOneCardStraightPossible(cards) {
    if (isSimpleOneCardStraightPossible(cards))
        return true;
    if (cards.length < 4)
        return false;
    const lowestAceCards = useSortedLowestAce(cards);
    if (lowestAceCards === null)
        return false;
    return isSimpleOneCardStraightPossible(lowestAceCards);
}
function useLowestAce(cards) {
    const firstAceIndex = cards.findIndex(c => c.value.code === AceCode);
    if (firstAceIndex < 0)
        return null;
    const firstAce = cards[firstAceIndex];
    const lowestAceCards = [...cards];
    lowestAceCards[firstAceIndex] = Object.assign(Object.assign({}, firstAce), { value: Object.assign(Object.assign({}, firstAce.value), { code: LowestStraightAceCode }) });
    return lowestAceCards;
}
function useSortedLowestAce(cards) {
    const lowestAceCards = useLowestAce(cards);
    if (lowestAceCards === null)
        return null;
    return sortInPlaceAscending(lowestAceCards);
}
/**
 * Simple because it does not account for A in both A2345 and TJQKA
 */
function isSimpleOneCardStraightPossible(cards) {
    if (cards.length < 4)
        return false;
    const sorted = sortInPlaceAscendingRemovingDuplicates([...cards]);
    const gapStraight = simpleFindFirstGapStraightOnSortedCards(sorted);
    return gapStraight !== null;
}
/**
 * Simple because it does not account for A in both A2345 and TJQKA
 */
function simpleFindFirstGapStraightOnSortedCards(sorted, startIndex = 0) {
    const consecutives = findFirstConsecutives(sorted, startIndex);
    if (consecutives === null)
        return null;
    if (consecutives.count >= 4)
        return { firstPiece: consecutives };
    if (consecutives.count === 2) {
        const followingConsecutives = findFirstConsecutives(sorted, consecutives.startIndex + consecutives.count);
        if (followingConsecutives === null)
            return null;
        if (consecutives.min.value.code + 3 === followingConsecutives.min.value.code) {
            return {
                firstPiece: consecutives,
                secondPiece: followingConsecutives,
            };
        }
        return null;
    }
    // consecutives count is 3
    if (consecutives.startIndex > 0) {
        if (consecutives.min.value.code === sorted[consecutives.startIndex - 1].value.code + 2) {
            return {
                firstPiece: {
                    startIndex: consecutives.startIndex - 1,
                    count: 1,
                    min: sorted[consecutives.startIndex - 1],
                },
                secondPiece: consecutives,
            };
        }
    }
    if (consecutives.startIndex + 3 < sorted.length) {
        if (consecutives.min.value.code + 4 === sorted[consecutives.startIndex + 3].value.code) {
            return {
                firstPiece: consecutives,
                secondPiece: {
                    startIndex: consecutives.startIndex + 3,
                    count: 1,
                    min: sorted[consecutives.startIndex + 3],
                },
            };
        }
    }
    return null;
}
/**
 * A gap straight is one that is missing one of the 5 cards
 */
export function findBestGapStraight(cards) {
    if (cards.length < 4)
        return null;
    const sorted = sortInPlaceAscendingRemovingDuplicates([...cards]);
    for (let i = cards.length - 4; i >= 0; i--) {
        const gapStraight = simpleFindFirstGapStraightOnSortedCards(sorted, i);
        if (gapStraight !== null)
            return gapStraight;
    }
    const lowestAceCards = useSortedLowestAce(sorted);
    if (lowestAceCards === null)
        return null;
    const lowestGapStraight = simpleFindFirstGapStraightOnSortedCards(lowestAceCards);
    return lowestGapStraight;
}
/**
 * Is there an open ended straight in these cards?
 * An open ended straight is one where either the top or bottom card is missing,
 * for instance 8,7,6,5 is an open ended straight because it's missing either a 9 or a 4
 */
export function isOpenEndedStraightPresent(cards) {
    if (cards.length < 4)
        return false;
    const sorted = sortInPlaceAscendingRemovingDuplicates([...cards]);
    const consecutives = findFirstConsecutives(sorted, 0);
    if (consecutives === null)
        return false;
    return consecutives.count >= 4;
}
export function findBestStraight(cards) {
    if (cards.length < 5)
        return null;
    const sorted = sortInPlaceAscendingRemovingDuplicates([...cards]);
    for (let i = sorted.length - 5; i >= 0; i--) {
        const straight = findFirstStraightOnSortedCards(sorted, i);
        if (straight !== null)
            return straight;
    }
    return null;
}
export function findFirstStraight(cards, startIndex = 0) {
    if (cards.length < 5)
        return null;
    const sorted = sortInPlaceAscendingRemovingDuplicates([...cards]);
    return findFirstStraightOnSortedCards(sorted, startIndex);
}
function findFirstStraightOnSortedCards(sorted, startIndex = 0) {
    const straight = simpleFindFirstStraightOnSortedCards(sorted, startIndex);
    if (straight !== null)
        return straight;
    if (sorted.length < 5 || startIndex > 0)
        return null;
    const lowestAceCards = useSortedLowestAce(sorted);
    if (lowestAceCards === null)
        return null;
    sortInPlaceAscending(lowestAceCards);
    return simpleFindFirstStraightOnSortedCards(lowestAceCards);
}
/**
 * Simple because it does not account for A in both A2345 and TJQKA
 */
function simpleFindFirstStraightOnSortedCards(sorted, startIndex = 0) {
    if (sorted.length < 5)
        return null;
    for (let i = startIndex; i < sorted.length - 5; i++) {
        const consecutives = findFirstConsecutives(sorted, i);
        if (consecutives !== null && consecutives.count >= 5)
            return consecutives;
    }
    return null;
}
export function findFirstConsecutives(sortedCards, startIndex = 0) {
    if (sortedCards.length - startIndex < 2)
        return null;
    const consecutives = {
        startIndex,
        count: 1,
        min: sortedCards[startIndex],
    };
    for (let i = startIndex + 1; i < sortedCards.length; i++) {
        if (sortedCards[i].value.code === consecutives.min.value.code + consecutives.count) {
            consecutives.count += 1;
        }
        else if (consecutives.count === 1) {
            consecutives.startIndex = i;
            consecutives.min = sortedCards[i];
        }
        else {
            return consecutives;
        }
    }
    if (consecutives.count > 1)
        return consecutives;
    return null;
}
export function getSuitCounts(cards) {
    const counts = {};
    for (const c of cards) {
        if (!counts[c.suit])
            counts[c.suit] = [c];
        else
            counts[c.suit].push(c);
    }
    return counts;
}
export function getHighestSuitCount(cards) {
    const counts = getSuitCounts(cards);
    let max = null;
    for (const suit in counts)
        if (max === null || max.length < counts[suit].length)
            max = counts[suit];
    return max;
}
export function getAvailableFlushValues(suitedCards) {
    const available = [];
    for (let i = 2; i < AceCode; i++)
        available.push(i);
    for (const c of suitedCards) {
        const index = available.indexOf(c.value.code);
        if (index >= 0)
            available.splice(index, 1);
    }
    return available;
}
export function getFirstOfSuit(cards, suit) {
    for (const c of cards)
        if (c.suit === suit)
            return c;
    return null;
}
export function getValueCounts(cards) {
    const counts = {};
    for (const c of cards) {
        if (!counts[c.value.code])
            counts[c.value.code] = [c];
        else
            counts[c.value.code].push(c);
    }
    return counts;
}
/**
 * If `n === 2` then this is equal to @see getPairs
 */
export function getNs(cards, n) {
    const counts = getValueCounts(cards);
    const ns = [];
    for (const key in counts) {
        const counted = counts[key];
        if (counted.length === n)
            ns.push(counted);
    }
    return ns;
}
/**
 * Returns a list of all pairs in `cards`
 */
export function getPairs(cards) {
    const pairs = getNs(cards, 2);
    return pairs;
}
/**
 * Returns a list of all triplets (three cards of the same value) in `cards`
 */
export function getTriplets(cards) {
    const threes = getNs(cards, 3);
    return threes;
}
export function getHighestCard(cards) {
    let max = null;
    for (const c of cards)
        if (max === null || c.value.code > max.value.code)
            max = c;
    return max;
}
export function getLowestCard(cards) {
    let min = null;
    for (const c of cards)
        if (min === null || c.value.code < min.value.code)
            min = c;
    return min;
}
export function sortInPlaceAscending(cards) {
    return cards.sort((c1, c2) => c1.value.code - c2.value.code);
}
export function removeSortedDuplicateValuesInPlace(cards) {
    for (let i = 0; i < cards.length - 1; i++) {
        while (i + 1 < cards.length && cards[i].value.code === cards[i + 1].value.code)
            cards.splice(i, 1);
    }
    return cards;
}
export function sortInPlaceAscendingRemovingDuplicates(cards) {
    const sorted = sortInPlaceAscending(cards);
    return removeSortedDuplicateValuesInPlace(sorted);
}
