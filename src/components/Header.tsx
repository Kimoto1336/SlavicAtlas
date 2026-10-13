import { NavLink } from "react-router";

export function Header() {
  return (
    <header className="hero-topline layout-header">
      <NavLink className="topline-brand" to="/" end aria-label="Атлас народной памяти — главная">
        АТЛАС НАРОДНОЙ ПАМЯТИ <span aria-hidden="true">✳</span>
      </NavLink>
      <nav className="top-nav" aria-label="Основная навигация">
        <NavLink to="/encyclopedia">Статьи</NavLink>
        <NavLink to="/about" end>О проекте</NavLink>
      </nav>
      <span className="edition-mark" aria-hidden="true">01 — 04</span>
    </header>
  );
}
