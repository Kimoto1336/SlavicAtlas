import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <div className="subpage-content">
      <section className="subpage-banner not-found-banner" aria-labelledby="not-found-title">
        <div className="subpage-banner-copy">
          <p className="hero-eyebrow">ЗАПИСЬ НЕ НАЙДЕНА <span aria-hidden="true">✳</span></p>
          <h1 id="not-found-title">Похоже,<br /><em>тропа затерялась.</em></h1>
          <p>Такой страницы нет в атласе. Вернитесь на главную или выберите другой материал.</p>
          <Link className="button button--light not-found-action" to="/">На главную <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="subpage-banner-mark" aria-hidden="true">ᛉ</div>
      </section>
      <div className="return-row"><Link className="text-link" to="/encyclopedia">Перейти к энциклопедии ↗</Link></div>
    </div>
  );
}
