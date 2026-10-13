import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
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
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const activeTopic = normalizeTopic(searchParams.get("topic"));

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

  function updateQuery(value: string) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set("q", value);
    else next.delete("q");
    setSearchParams(next, { replace: true });
  }

  function chooseTopic(topic: string) {
    const next = new URLSearchParams(searchParams);
    if (topic === "Все темы") next.delete("topic");
    else next.set("topic", topic);
    setSearchParams(next, { replace: true });
  }

  function clearFilters() {
    setSearchParams({}, { replace: true });
  }

  function toggleFavorite(id: string) {
    setFavoriteIds((current) => current.includes(id)
      ? current.filter((favoriteId) => favoriteId !== id)
      : [...current, id]);
  }

  return (
    <div className="subpage-content">
      <section className="subpage-banner" aria-labelledby="encyclopedia-title">
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
        <label className="search-box"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => updateQuery(event.target.value)} type="search" placeholder="Поиск по названию или описанию" aria-label="Поиск по каталогу" /></label>
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
            : visibleEntries.length ? <MythList entries={visibleEntries} favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />
              : <div className="empty-state"><h3>Материалы не найдены</h3><p>Попробуйте изменить запрос или выбрать другое направление.</p><button className="button button--dark" type="button" onClick={clearFilters}>Сбросить фильтры</button></div>}
      </section>

      <div className="return-row"><Link className="text-link" to="/">← Вернуться на главную</Link><Link className="text-link" to="/about">О проекте ↗</Link></div>
    </div>
  );
}
