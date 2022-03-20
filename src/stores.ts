import type { Image } from "$lib/reddit";
import { writable } from "svelte/store";

// initialize with empty map (keys are linkIds)
export const linkStore = writable({} as Map<string, Image>);