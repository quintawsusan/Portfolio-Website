import "./Navbar.css";

const items = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="navbar-container">
      <nav className="navbar" aria-label="Main navigation">
        <a className="navbar-logo" href="#home" aria-label="Quinta, home">
          <span className="navbar-mark">
            <i />
            <i />
          </span>
          <span>Quinta</span>
        </a>
        <div className="navbar-links">
          {items.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
        <span className="navbar-theme-placeholder" aria-hidden="true" />
      </nav>
    </header>
  );
}
