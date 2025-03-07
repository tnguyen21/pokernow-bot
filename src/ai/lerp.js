/**
 * Linear interpolation, works like https://docs.unity3d.com/ScriptReference/Mathf.Lerp.html
 */
export function lerp(min, max, t) {
    return min + (max - min) * t;
}
