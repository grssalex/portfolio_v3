import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** true côté client après hydratation, false au rendu serveur (export statique). */
export function useMounted() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
