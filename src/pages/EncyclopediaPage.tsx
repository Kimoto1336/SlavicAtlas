import { useEffect, useMemo, useState } from "react";
import { Header } from "../components/Header";
import { MythList } from "../components/MythList";
import { fetchMythologyEntries } from "../services/mythologyApi";
import type { MythologyEntry } from "../types/mythology";

const filters = [
  { value: "Все темы", label: "Все материалы" },
  { value: "Боги", label: "Божества" },
  { value: "Духи и существа", label: "Духи и существа" },
  { value: "Герои", label: "Герои и сказания" },
];

function normalizeTopic(topic: string | null): string {
  if (!topic) return "Все темы";
  if (topic === "Духи" || topic === "Существа") return "Духи и существа";
  return filters.some((filter) => filter.value === topic) ? topic : "Все темы";
}

function belongsToTopic(entry: MythologyEntry, topic: string) {
  if (topic === "Все темы") return true;
  if (topic === "Духи и существа") return entry.category === "Духи" || entry.category === "Существа";
  return entry.category === topic;
}

export function EncyclopediaPage() {
  const [entries, setEntries] = useState<MythologyEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [activeTopic, setActiveTopic] = useState(() => normalizeTopic(new URLSearchParams(window.location.search).get("topic")));
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<MythologyEntry | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetchMythologyEntries()
      .then((data) => { if (isMounted) setEntries(data); })
      .catch(() => { if (isMounted) setError("Не удалось загрузить материалы. Попробуйте обновить страницу."); })
      .finally(() => { if (isMounted) setIsLoading(false); });
    return () => { isMounted = false; };
  }, []);

  const visibleEntries = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("ru-RU");
    return entries.filter((entry) => belongsToTopic(entry, activeTopic)
      && `${entry.title} ${entry.description} ${entry.category}`.toLocaleLowerCase("ru-RU").includes(normalizedQuery));
  }, [entries, activeTopic, query]);

  function chooseTopic(topic: string) {
    setActiveTopic(topic);
    const url = new URL(window.location.href);
    if (topic === "Все темы") url.searchParams.delete("topic");
    else url.searchParams.set("topic", topic);
    window.history.replaceState({}, "", `${url.pathname}${url.search}`);
  }

  function toggleFavorite(id: string) {
    setFavoriteIds((current) => current.includes(id)
      ? current.filter((favoriteId) => favoriteId !== id)
      : [...current, id]);
  }

  return (
    <div className="app-shell">
      <main className="page-content subpage-content">
        <section className="subpage-banner" aria-labelledby="encyclopedia-title">
          <Header />
          <div className="subpage-banner-copy">
            <p className="hero-eyebrow">КАТАЛОГ ПРЕДАНИЙ <span aria-hidden="true">✳</span></p>
            <h1 id="encyclopedia-title">Исследовать<br /><em>энциклопедию.</em></h1>
            <p>Выберите направление или найдите знакомый образ — все материалы собраны в одном каталоге.</p>
          </div>
          <div className="subpage-banner-mark" aria-hidden="true">ᛉ</div>
        </section>

        <div className="subpage-intro-row">
          <div><p className="eyebrow">АРХИВ ОБРАЗОВ И СЮЖЕТОВ</p><h2>Материалы для чтения</h2></div>
          <p className="subpage-intro-note">{isLoading ? "Загружаем коллекцию…" : `${entries.length} записей · ${filters.length - 1} направления`}</p>
        </div>

        <section className="catalog-tools" aria-label="Поиск и фильтры каталога">
          <label className="search-box"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Поиск по названию или описанию" aria-label="Поиск по каталогу" /></label>
          <div className="catalog-filters" role="group" aria-label="Фильтр по темам">
            {filters.map((filter) => (
              <button key={filter.value} className={`filter-chip${activeTopic === filter.value ? " filter-chip--active" : ""}`} type="button" aria-pressed={activeTopic === filter.value} onClick={() => chooseTopic(filter.value)}>{filter.label}</button>
            ))}
          </div>
        </section>

        <section className="catalog-results" aria-live="polite">
          <div className="catalog-results-heading"><span>{activeTopic === "Все темы" ? "ВСЯ КОЛЛЕКЦИЯ" : filters.find((filter) => filter.value === activeTopic)?.label.toLocaleUpperCase("ru-RU")}</span><span>{isLoading ? "…" : `${visibleEntries.length} ${visibleEntries.length === 1 ? "материал" : visibleEntries.length < 5 ? "материала" : "материалов"}`}</span></div>
          {isLoading ? <div className="loading-state" role="status"><span className="loading-mark">✳</span> Загружаем предания…</div>
            : error ? <div className="error-state" role="alert"><h3>Не получилось открыть атлас</h3><p>{error}</p></div>
              : visibleEntries.length ? <MythList entries={visibleEntries} favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} onRead={setSelectedEntry} />
                : <div className="empty-state"><h3>Материалы не найдены</h3><p>Попробуйте изменить запрос или выбрать другое направление.</p><button className="button button--dark" type="button" onClick={() => { setQuery(""); chooseTopic("Все темы"); }}>Сбросить фильтры</button></div>}
        </section>

        <div className="return-row"><a className="text-link" href="/">← Вернуться на главную</a><a className="text-link" href="/about">О проекте ↗</a></div>
      </main>

      {selectedEntry && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedEntry(null); }}>
          <section className="reading-modal" role="dialog" aria-modal="true" aria-labelledby="reading-title">
            <button className="modal-close" type="button" onClick={() => setSelectedEntry(null)} aria-label="Закрыть материал">×</button>
            <p className="eyebrow">{selectedEntry.category} · АТЛАС НАРОДНОЙ ПАМЯТИ</p>
            <h2 id="reading-title">{selectedEntry.title}</h2>
            <p className="reading-modal__description">{selectedEntry.description}</p>
            <div className="reading-details"><div><span>Раздел</span><strong>{selectedEntry.category}</strong></div><div><span>Материал</span><strong>{selectedEntry.status === "Опубликовано" ? "Опубликован" : "В подготовке"}</strong></div><div><span>Заметок в подборке</span><strong>{selectedEntry.sourceCount}</strong></div></div>
            <p className="reading-note">Это краткая справочная запись из учебного каталога. Подборка организована как mock-источник для лабораторной работы.</p>
            <button className="button button--dark" type="button" onClick={() => setSelectedEntry(null)}>Вернуться к каталогу <span aria-hidden="true">↗</span></button>
          </section>
        </div>
      )}
    </div>
  );
}
