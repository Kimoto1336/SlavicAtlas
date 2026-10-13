import type { MythologyEntry } from "../types/mythology";

interface MythCardProps {
  entry: MythologyEntry;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onRead: (entry: MythologyEntry) => void;
}

const entrySymbols: Record<string, string> = {
  perun: "ϟ",
  veles: "🐂",
  "moko-sh": "🌾",
  svarog: "✧",
  domovoy: "⌂",
  leshy: "♧",
  rusalka: "≈",
  "baba-yaga": "✺",
  zmei: "〰",
  "al-konost": "♫",
  "ivan-czarevich": "⚔",
  snegurochka: "❄",
};

const displayCategory: Record<string, string> = {
  Боги: "Божества",
  Духи: "Духи и существа",
  Существа: "Духи и существа",
  Герои: "Герои и сказания",
};

export function MythCard({ entry, isFavorite, onToggleFavorite, onRead }: MythCardProps) {
  return (
    <article className="myth-card">
      <div className="myth-card__topline">
        <div className="myth-card__symbol" aria-hidden="true">
          {entrySymbols[entry.id] ?? "✦"}
        </div>
        <button
          className={`favorite-button${isFavorite ? " is-favorite" : ""}`}
          type="button"
          onClick={() => onToggleFavorite(entry.id)}
          aria-label={isFavorite ? `Убрать ${entry.title} из избранного` : `Добавить ${entry.title} в избранное`}
          aria-pressed={isFavorite}
          title={isFavorite ? "Убрать из избранного" : "В избранное"}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>

      <p className="category-label">{displayCategory[entry.category] ?? entry.category} · славянская традиция</p>
      <h3>{entry.title}</h3>
      <p className="myth-card__description">{entry.description}</p>

      <div className="myth-card__footer">
        <span className={`reading-status${entry.status === "Черновик" ? " reading-status--draft" : ""}`}>
          <span className="status-dot" aria-hidden="true" />
          {entry.status === "Опубликовано" ? "Опубликовано" : "В подготовке"}
        </span>
        <span className="source-count">{entry.sourceCount} заметок</span>
      </div>
      <button className="read-link" type="button" onClick={() => onRead(entry)}>
        Читать запись <span aria-hidden="true">↗</span>
      </button>
    </article>
  );
}

