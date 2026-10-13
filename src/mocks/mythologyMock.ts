import type { MythologyEntry } from "../types/mythology";

const mythologyEntries: MythologyEntry[] = [
  {
    id: "perun",
    title: "Перун",
    description:
      "В карточке собраны основные сведения о Перуне как одном из центральных образов восточнославянской мифологической традиции.",
    category: "Боги",
    status: "Опубликовано",
    sourceCount: 8,
    date: "2026-09-01",
    isActive: true,
  },
];

export function getMythologyEntriesMock(): Promise<MythologyEntry[]> {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(mythologyEntries);
    }, 700);
  });
}

