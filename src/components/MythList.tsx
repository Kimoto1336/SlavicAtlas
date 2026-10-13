import type { MythologyEntry } from "../types/mythology";
import { MythCard } from "./MythCard";

interface MythListProps {
  entries: MythologyEntry[];
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
  onRead: (entry: MythologyEntry) => void;
}

export function MythList({ entries, favoriteIds, onToggleFavorite, onRead }: MythListProps) {
  if (entries.length === 0) {
    return (
      <div className="empty-state">
        <h3>В этой теме пока нет записей</h3>
        <p>Выберите другое направление, чтобы продолжить путешествие.</p>
      </div>
    );
  }

  return (
    <div id="articles" className="entries-grid" aria-label="Статьи для чтения">
      {entries.map((entry) => (
        <MythCard
          key={entry.id}
          entry={entry}
          isFavorite={favoriteIds.includes(entry.id)}
          onToggleFavorite={onToggleFavorite}
          onRead={onRead}
        />
      ))}
    </div>
  );
}
