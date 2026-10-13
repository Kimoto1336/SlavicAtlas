import { useEffect, useState } from "react";
import { Link } from "react-router";
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
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-body">
          <div className="hero-copy">
            <h1 id="hero-title">Мир, сотканный<br />из <em>преданий.</em></h1>
            <p className="hero-lead">Путеводитель по славянским мифологиям: божества, духи, обряды<br className="desktop-break" /> и образы, сохранившиеся в народной памяти.</p>
            <div className="hero-actions">
              <Link className="button button--light" to="/encyclopedia">Исследовать энциклопедию <span aria-hidden="true">↗</span></Link>
              <Link className="button button--quiet" to="/about">О проекте <span aria-hidden="true">›</span></Link>
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
          <Link className="text-link" to="/encyclopedia">Все статьи <span aria-hidden="true">↗</span></Link>
        </div>
        {isLoading ? (
          <div className="loading-state" role="status"><span className="loading-mark">✳</span> Загружаем предания…</div>
        ) : error ? (
          <div className="error-state" role="alert"><h3>Не получилось открыть атлас</h3><p>{error}</p></div>
        ) : (
          <MythList entries={entries.slice(0, 3)} favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />
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
              <Link className="topic-row" key={topic.title} to={topic.href}>
                <span className="topic-symbol" aria-hidden="true">{topic.symbol}</span>
                <span className="topic-copy"><strong>{topic.title}</strong><small>{topic.subtitle}{!isLoading ? ` · ${count} ${count === 1 ? "статья" : "статей"}` : ""}</small></span>
                <span className="topic-arrow" aria-hidden="true">↗</span>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
