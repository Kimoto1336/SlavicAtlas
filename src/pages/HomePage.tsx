import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { MythList } from "../components/MythList";
import { fetchMythologyEntries } from "../services/mythologyApi";
import type { MythologyEntry } from "../types/mythology";

const topics = [
  { title: "Божества", subtitle: "Персонажи пантеонов", symbol: "✺", href: "/encyclopedia?topic=Боги" },
  { title: "Духи и существа", subtitle: "Хранители и обитатели миров", symbol: "♧", href: "/encyclopedia?topic=Духи%20и%20существа" },
  { title: "Герои и сказания", subtitle: "Образы народных историй", symbol: "☼", href: "/encyclopedia?topic=Герои" },
];

export function HomePage() {
  const [entries, setEntries] = useState<MythologyEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  function toggleFavorite(id: string) {
    setFavoriteIds((current) => current.includes(id)
      ? current.filter((favoriteId) => favoriteId !== id)
      : [...current, id]);
  }

  const publishedCount = entries.filter((entry) => entry.status === "Опубликовано").length;

  return (
    <div className="app-shell" id="top">
      <main className="page-content">
        <section className="hero" aria-labelledby="hero-title">
          <Header />
          <div className="hero-body">
            <div className="hero-copy">
              <h1 id="hero-title">Мир, сотканный<br />из <em>преданий.</em></h1>
              <p className="hero-lead">Путеводитель по славянским мифологиям: божества, духи, обряды<br className="desktop-break" /> и образы, сохранившиеся в народной памяти.</p>
              <div className="hero-actions">
                <a className="button button--light" href="/encyclopedia">Исследовать энциклопедию <span aria-hidden="true">↗</span></a>
                <a className="button button--quiet" href="/about">О проекте <span aria-hidden="true">›</span></a>
              </div>
            </div>
            <div className="hero-art" aria-hidden="true">
              <div className="orbit orbit--outer" /><div className="orbit orbit--middle" /><div className="orbit orbit--inner" />
              <span className="hero-star">✳</span><span className="hero-rune">ᛉ</span>
              <span className="hero-art-caption">СЛАВЯНСКОЕ<br />МИРОВОЗЗРЕНИЕ</span>
            </div>
          </div>
          <div className="hero-index">01 / 04</div>
        </section>

        <section className="stats-strip" aria-label="Каталог в цифрах">
          <div className="stat-item"><span className="stat-label">01 / КОЛЛЕКЦИЯ</span><p><strong>{isLoading ? "…" : String(entries.length).padStart(2, "0")}</strong> <span>статей</span></p></div>
          <div className="stat-item"><span className="stat-label">02 / РАЗДЕЛЫ</span><p><strong>03</strong> <span>направления</span></p></div>
          <div className="stat-item"><span className="stat-label">03 / ДОСТУПНО</span><p><strong>{isLoading ? "…" : String(publishedCount).padStart(2, "0")}</strong> <span>материалов</span></p></div>
          <p className="stats-quote">«У каждого края — свой рассказ»</p>
        </section>

        <section className="content-section" aria-labelledby="discover-title">
          <div className="section-heading">
            <div><p className="eyebrow">НАЧНИТЕ ПУТЕШЕСТВИЕ</p><h2 id="discover-title">Откройте для себя</h2></div>
            <a className="text-link" href="/encyclopedia">Все статьи <span aria-hidden="true">↗</span></a>
          </div>
          {isLoading ? (
            <div className="loading-state" role="status"><span className="loading-mark">✳</span> Загружаем предания…</div>
          ) : error ? (
            <div className="error-state" role="alert"><h3>Не получилось открыть атлас</h3><p>{error}</p></div>
          ) : (
            <MythList entries={entries.slice(0, 3)} favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} onRead={setSelectedEntry} />
          )}
        </section>

        <section id="topics" className="topics-panel" aria-labelledby="topics-title">
          <div className="topics-intro">
            <p className="eyebrow">ПУТЬ ИССЛЕДОВАТЕЛЯ</p>
            <h2 id="topics-title">У каждой истории<br />есть своё место.</h2>
            <p>Выберите направление — на отдельной странице откроется подборка материалов для чтения.</p>
          </div>
          <div className="topic-list" aria-label="Темы для чтения">
            {topics.map((topic) => {
              const count = topic.title === "Божества"
                ? entries.filter((entry) => entry.category === "Боги").length
                : topic.title === "Духи и существа"
                  ? entries.filter((entry) => entry.category === "Духи" || entry.category === "Существа").length
                  : entries.filter((entry) => entry.category === "Герои").length;
              return (
                <a className="topic-row" key={topic.title} href={topic.href}>
                  <span className="topic-symbol" aria-hidden="true">{topic.symbol}</span>
                  <span className="topic-copy"><strong>{topic.title}</strong><small>{topic.subtitle}{!isLoading ? ` · ${count} ${count === 1 ? "статья" : "статей"}` : ""}</small></span>
                  <span className="topic-arrow" aria-hidden="true">↗</span>
                </a>
              );
            })}
          </div>
        </section>
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
            <a className="button button--dark" href={`/encyclopedia?topic=${encodeURIComponent(selectedEntry.category)}`}>Продолжить чтение <span aria-hidden="true">↗</span></a>
          </section>
        </div>
      )}
    </div>
  );
}
