import { Link, Outlet } from "react-router";
import { CurrentAddress } from "./CurrentAddress";
import { Header } from "./Header";
import { PageTitle } from "./PageTitle";

export function Layout() {
  return (
    <div className="app-shell" id="top">
      <PageTitle />
      <main className="page-content">
        <Header />
        <Outlet />
        <footer className="site-footer">
          <Link className="site-footer-brand" to="/">Атлас народной памяти <span aria-hidden="true">✳</span></Link>
          <CurrentAddress />
        </footer>
      </main>
    </div>
  );
}
