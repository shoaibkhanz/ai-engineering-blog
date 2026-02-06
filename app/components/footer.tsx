import Link from "next/link";

const navLinks = [
  { label: "~/home", href: "/" },
  { label: "~/writing", href: "/blog" },
  { label: "~/experiments", href: "/experiments" },
  { label: "~/about", href: "/about" },
];

const socialLinks = [
  { label: "github", href: "https://github.com/shoaibkhanz" },
  { label: "linkedin", href: "https://linkedin.com/in/shoaibkhanz" },
  { label: "email", href: "mailto:shoaibkhanz@hotmail.com" },
];

export function Footer() {
  return (
    <footer className="relative z-1 border-t border-border">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Terminal-style session info */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-8">
          {/* Nav as directory listing */}
          <div>
            <p className="text-[11px] text-text-secondary mb-3">
              <span className="text-accent">$</span> ls ~/
            </p>
            <nav className="flex flex-wrap gap-x-4 gap-y-1.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-text-secondary hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social as env vars */}
          <div>
            <p className="text-[11px] text-text-secondary mb-3">
              <span className="text-accent">$</span> env | grep SOCIAL
            </p>
            <div className="flex flex-col gap-1">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-xs text-text-secondary hover:text-accent transition-colors"
                >
                  <span className="text-text-secondary/60">SOCIAL_</span>
                  <span className="uppercase">{link.label}</span>
                  <span className="text-text-secondary/60">=</span>
                  <span className="text-accent/70">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Dotted separator */}
        <div className="text-text-secondary/20 text-[10px] mb-4 overflow-hidden whitespace-nowrap">
          · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · ·
        </div>

        {/* Process exit */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <p className="text-[11px] text-text-secondary/50">
            <span className="text-accent/50">$</span> echo $?
            <span className="text-green/60 ml-2">0</span>
            <span className="text-text-secondary/30 ml-3">·</span>
            <span className="text-text-secondary/40 ml-3">
              &copy; {new Date().getFullYear()} Shoaib Khan
            </span>
          </p>
          <p className="text-[10px] text-text-secondary/30">
            built with next.js · styled by terminal
          </p>
        </div>
      </div>
    </footer>
  );
}
