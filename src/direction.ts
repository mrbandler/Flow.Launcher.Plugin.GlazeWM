export const directions = ["left", "right", "up", "down"] as const;
export type Direction = (typeof directions)[number];
