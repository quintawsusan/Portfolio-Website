
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer page-shell">
      <span>© {new Date().getFullYear()} Quinta Susan</span>

      <a href="#home" className="back-to-top" aria-label="Back to top">
        ↑
      </a>

      <span>Designed & built with curiosity.</span>
    </footer>
  );
}
