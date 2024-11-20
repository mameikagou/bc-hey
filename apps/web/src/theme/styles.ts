export enum TRANSITION_DURATIONS {
    slow = 500,
    medium = 250,
    fast = 125,
}
const transitions = {
    duration: {
        slow: `${TRANSITION_DURATIONS.slow}ms`,
        medium: `${TRANSITION_DURATIONS.medium}ms`,
        fast: `${TRANSITION_DURATIONS.fast}ms`,
    },
    timing: {
        ease: 'ease',
        in: 'ease-in',
        out: 'ease-out',
        inOut: 'ease-in-out',
    },
}
