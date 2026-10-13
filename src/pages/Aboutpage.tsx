import { Link } from "react-router";

export function AboutPage() {
  return (
    <div className="subpage-content">
      <section className="subpage-banner about-banner" aria-labelledby="about-title">
        <div className="subpage-banner-copy">
          <p className="hero-eyebrow">ИДЕЯ И ПОДХОД <span aria-hidden="true">✳</span></p>
          <h1 id="about-title">Память,<br /><em>собранная в атлас.</em></h1>
          <p>Небольшой путеводитель по образам и сюжетам славянской мифологии — место, с которого можно начать знакомство с народными преданиями.</p>
        </div>
        <div className="subpage-banner-mark" aria-hidden="true">✺</div>
      </section>

      <section className="about-lead-grid">
        <div><p className="eyebrow">О ПРОЕКТЕ</p><h2>У каждого предания<br />есть свой контекст.</h2></div>
        <p>«Атлас народной памяти» организует материалы по нескольким понятным направлениям: божества, духи и существа, герои и сказания. Карточки дают краткую отправную точку, а каталог помогает находить связанные темы и возвращаться к интересующим образам.</p>
      </section>

      <section className="about-values" aria-label="Принципы проекта">
        <article className="about-value"><span>01</span><div><h3>Навигация по темам</h3><p>Материалы распределены по тематическим разделам, чтобы переходить от одного образа к целой группе связанных сюжетов.</p></div></article>
        <article className="about-value"><span>02</span><div><h3>Краткие записи</h3><p>Каждая карточка содержит название, короткое описание и справочные отметки. Каталог рассчитан на постепенное расширение.</p></div></article>
        <article className="about-value"><span>03</span><div><h3>Учебный прототип</h3><p>Проект создан как лабораторная работа на React: данные загружаются из mock-источника, а состояние интерфейса управляется хуками.</p></div></article>
      </section>

      <section className="about-tech-panel">
        <div><p className="eyebrow">КАК УСТРОЕН САЙТ</p><h2>Простая основа,<br />которую можно развивать.</h2></div>
        <div className="about-tech-list"><p><strong>React + TypeScript</strong><span>Компоненты и типизация данных</span></p><p><strong>React Router</strong><span>Маршруты, параметры адреса и внутренние переходы</span></p><p><strong>useState</strong><span>Состояние каталога и избранного</span></p><p><strong>useEffect</strong><span>Получение mock-данных и заголовок вкладки при навигации</span></p><p><strong>Vite</strong><span>Локальный запуск и production-сборка</span></p></div>
      </section>

      <div className="return-row"><Link className="text-link" to="/">← Вернуться на главную</Link><Link className="text-link" to="/encyclopedia">Открыть энциклопедию ↗</Link></div>
    </div>
  );
}
