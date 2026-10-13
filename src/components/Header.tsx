export function Header() {
  return (
    <header className="hero-topline">
      <a className="topline-brand" href="/" aria-label="Атлас народной памяти — главная">
        АТЛАС НАРОДНОЙ ПАМЯТИ <span aria-hidden="true">✳</span>
      </a>
      <nav className="top-nav" aria-label="Основная навигация">
        <a href="/encyclopedia">Энциклопедия</a>
        <a href="/about">О проекте</a>
      </nav>
      <span className="edition-mark">01 — 04</span>
    </header>
  );
}
