export function calcBetEV(E, P, S, c, t) {
    const n = t.isHeadsUp ? 1 : 2;
    const f = Math.max(0, 1 - Math.min(S / P, 1)) * c * n;
    const EV = E * (P + f) - (1 - E) * S;
    return EV;
}

export function calcCallEV(E, P, S) {
    const EV = (E * (P - S + S)) - ((1 - E) * S);
    return EV;
}

export function calcEVCallLimit(E, P) {
    const MaxCall = 10;
    const CallValues = Array.from({ length: MaxCall * 100 }, (_, i) => (i + 1) / 100);
    const EV = CallValues.map(S => calcCallEV(E, P, S));
    const BestEquity = Math.min(...EV.map(x => Math.abs(x - 0)));
    return CallValues[EV.indexOf(BestEquity)];
}

export function calcBetLimit(E, P, c, t, logger) {
    const Step = 0.01;
    const MaxCall = 1000;
    const rng = Math.round((1 * Step + MaxCall) / Step);
    const EV = Array.from({ length: rng }, (_, S) => calcBetEV(E, P, S * Step, c, t));

    const BestEquity = Math.max(...EV);
    logger.debug("Experimental maximum EV for betting: " + BestEquity);
    return Math.round(EV.indexOf(BestEquity) * Step * 100) / 100;
}

export function calcMaxInvest(equity, pw, bigBlindMultiplier) {
    return Math.round(Math.pow(equity, pw) * bigBlindMultiplier * 100) / 100;
}   