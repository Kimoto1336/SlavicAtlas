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
    {
    id: "veles",
    title: "Велес",
    description:
      "Справочная запись о Велесе и связанных с ним мотивах мира природы, достатка, мудрости и подземной сферы.",
    category: "Боги",
    status: "Опубликовано",
    sourceCount: 7,
    date: "2026-09-02",
    isActive: true,
  },
  {
    id: "moko-sh",
    title: "Мокошь",
    description:
      "Материал о женском образе Мокоши и его связи с домашним бытом, прядением и представлениями о судьбе.",
    category: "Боги",
    status: "Опубликовано",
    sourceCount: 6,
    date: "2026-09-03",
    isActive: true,
  },
  {
    id: "svarog",
    title: "Сварог",
    description:
      "Учебная карточка с кратким описанием образа Сварога в славянской мифологической традиции.",
    category: "Боги",
    status: "Опубликовано",
    sourceCount: 5,
    date: "2026-09-04",
    isActive: true,
  },
  {
    id: "domovoy",
    title: "Домовой",
    description:
      "Справочная запись о духе домашнего пространства и фольклорных представлениях о его взаимодействии с людьми.",
    category: "Духи",
    status: "Опубликовано",
    sourceCount: 9,
    date: "2026-09-05",
    isActive: true,
  },
  {
    id: "leshy",
    title: "Леший",
    description:
      "Материал о лесном духе в славянской фольклорной традиции и связанных с ним сюжетах.",
    category: "Духи",
    status: "Опубликовано",
    sourceCount: 6,
    date: "2026-09-06",
    isActive: true,
  },
  {
    id: "rusalka",
    title: "Русалка",
    description:
      "Карточка о фольклорном образе русалки и традиционных сюжетах, в которых она появляется.",
    category: "Духи",
    status: "Опубликовано",
    sourceCount: 8,
    date: "2026-09-07",
    isActive: true,
  },
  {
    id: "baba-yaga",
    title: "Баба-яга",
    description:
      "Справочная статья о персонаже славянского и восточнославянского фольклора, известном по волшебным сказкам.",
    category: "Существа",
    status: "Опубликовано",
    sourceCount: 10,
    date: "2026-09-08",
    isActive: true,
  },
  {
    id: "zmei",
    title: "Змей",
    description:
      "Учебная карточка об образе змея в сказочной и мифологической традиции.",
    category: "Существа",
    status: "Черновик",
    sourceCount: 4,
    date: "2026-09-09",
    isActive: true,
  },
  {
    id: "al-konost",
    title: "Алконост",
    description:
      "Краткая энциклопедическая запись о птице с человеческими чертами из восточнославянской книжной и изобразительной традиции.",
    category: "Существа",
    status: "Опубликовано",
    sourceCount: 5,
    date: "2026-09-10",
    isActive: true,
  },
  {
    id: "ivan-czarevich",
    title: "Иван-царевич",
    description:
      "Материал о сказочном герое, который встречается в восточнославянских волшебных сказках.",
    category: "Герои",
    status: "Опубликовано",
    sourceCount: 7,
    date: "2026-09-11",
    isActive: true,
  },
  {
    id: "snegurochka",
    title: "Снегурочка",
    description:
      "Справочная карточка о фольклорном и литературном образе Снегурочки.",
    category: "Герои",
    status: "Черновик",
    sourceCount: 3,
    date: "2026-09-12",
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

