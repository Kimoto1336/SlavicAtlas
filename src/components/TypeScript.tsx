import { useEffect } from "react";
import { useLocation } from "react-router";

const BASE_TITLE = "Атлас народной памяти";

export function PageTitle() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/") {
      document.title = `${BASE_TITLE} — славянская мифология`;
    } else if (pathname === "/encyclopedia") {
      document.title = `Энциклопедия — ${BASE_TITLE}`;
    } else if (pathname === "/about") {
      document.title = `О проекте — ${BASE_TITLE}`;
    } else if (pathname.startsWith("/encyclopedia/")) {
      document.title = `Материал — ${BASE_TITLE}`;
    } else {
      document.title = `Страница не найдена — ${BASE_TITLE}`;
    }
  }, [pathname]);

  return null;
}
