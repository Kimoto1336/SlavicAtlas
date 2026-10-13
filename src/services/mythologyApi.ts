import { getMythologyEntriesMock } from "../mocks/mythologyMock";
import type { MythologyEntry } from "../types/mythology";

export function fetchMythologyEntries(): Promise<MythologyEntry[]> {
  return getMythologyEntriesMock();
}
