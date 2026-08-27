export const featureFlags = {
  storeEnabled: false,
} as const;

/** Public routes hidden while their flag is off. Flip the flag to restore them. */
export function isRouteEnabled(path: string): boolean {
  if (path === "/store") return featureFlags.storeEnabled;
  return true;
}
