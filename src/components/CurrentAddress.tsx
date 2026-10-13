import { useLocation } from "react-router";

export function CurrentAddress() {
  const { pathname } = useLocation();
  return (
    <p className="site-footer-path">
      <span>Текущий адрес</span>
      <code>{pathname || "/"}</code>
    </p>
  );
}
