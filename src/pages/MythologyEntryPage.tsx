import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { fetchMythologyEntries } from "../services/mythologyApi";
import type { MythologyEntry } from "../types/mythology";

function formatDate(value: string) {
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" }).format(date);
}

export function MythologyEntryPage() {
  const { id } = useParams<{ id: string }>();
  const [entries, setEntries] = useState<MythologyEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetchMythologyEntries()
      .then((data) => { if (isMounted) setEntries(data); })
      .catch(() => { if (isMounted) setError("Не удалось загрузить запись. Попробуйте обновить страницу."); })
      .finally(() => { if (isMounted) setIsLoading(false); });
    return () => { isMounted = false; };
  }, []);

  const entry = entries.find((item) => item.id === id);
  const topic = entry?.category === "Духи" || entry?.category === "Существа"
    ? "Духи и существа"
    : entry?.category;
  const catalogUrl = topic ? `/encyclopedia?topic=${encodeURIComponent(topic)}` : "/encyclopedia";

  return (
    <div className="subpage-content">
      <section className="subpage-banner article-banner" aria-labelledby="entry-title">
        <div className="subpage-banner-copy">
          <p className="hero-eyebrow">ЗАПИСЬ АТЛАСА <span aria-hidden="true">✳</span></p>
          <h1 id="entry-title">{isLoading ? "Открываем предание…" : entry?.title ?? "Материал не найден"}</h1>
          <p>{isLoading ? "Получаем данные из mock-источника." : entry?.description ?? "Записи с таким идентификатором нет в каталоге."}</p>
        </div>
        <div className="subpage-banner-mark" aria-hidden="true">✺</div>
      </section>

      {isLoading ? (
        <div className="loading-state" role="status"><span className="loading-mark">✳</span> Загружаем предание…</div>
      ) : error ? (
        <div className="error-state" role="alert"><h2>Не получилось открыть материал</h2><p>{error}</p></div>
      ) : entry ? (
        <article className="entry-detail">
          <p className="eyebrow">ПОДРОБНОСТИ МАТЕРИАЛА</p>
          <div className="entry-detail-grid">
            <div><span>Тема</span><strong>{topic}</strong></div>
            <div><span>Статус</span><strong>{entry.status === "Опубликовано" ? "Опубликовано" : "В подготовке"}</strong></div>
            <div><span>Заметок в подборке</span><strong>{entry.sourceCount}</strong></div>
            <div><span>Добавлено</span><strong>{formatDate(entry.date)}</strong></div>
          </div>
          <p className="entry-detail-note">Это краткая справочная запись из учебного mock-каталога. Материал можно использовать как отправную точку для дальнейшего чтения и расширять по мере развития проекта.</p>
        </article>
      ) : (
        <section className="empty-state entry-not-found" role="status">
          <h2>Книга преданий не открылась</h2>
          <p>Проверьте адрес или выберите существующий материал в энциклопедии.</p>
        </section>
      )}

      <div className="return-row">
        <Link className="text-link" to={catalogUrl}>← Вернуться к теме</Link>
        <Link className="text-link" to="/encyclopedia">Все материалы ↗</Link>
      </div>
    </div>
  );
}
