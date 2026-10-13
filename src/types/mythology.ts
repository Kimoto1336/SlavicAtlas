export interface MythologyEntry {
  id: string;
  title: string;
  description: string;
  category: string;
  status: "Опубликовано" | "Черновик";
  sourceCount: number;
  date: string;
  isActive: boolean;
}
