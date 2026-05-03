import Link from "next/link";
import { Zap } from "lucide-react";

const LINKS = {
  Shop: [
    { label: "All Products", href: "/products" },
    { label: "Phones", href: "/products?category=phone" },
    { label: "Laptops", href: "/products?category=laptop" },
    { label: "Headphones", href: "/products?category=headphone" },
    { label: "Tablets", href: "/products?category=tablet" },
  ],
  Support: [
    { label: "FAQ", href: "#" },
    { label: "Shipping Policy", href: "#" },
    { label: "Returns", href: "#" },
    { label: "Contact Us", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer style={{
      background: "#111827",
      color: "#9ca3af",
      marginTop: "auto",
    }}>
      <div className="container" style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "2rem",
          marginBottom: "2.5rem",
        }}>
          {/* Brand */}
          <div>
            <Link href="/" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontWeight: 700,
              fontSize: "1.125rem",
              color: "white",
              textDecoration: "none",
              marginBottom: "0.75rem",
            }}>
              <div style={{
                background: "#2563eb",
                color: "white",
                padding: "0.375rem",
                borderRadius: "0.5rem",
                display: "flex",
              }}>
                <Zap size={16} />
              </div>
              TechStore
            </Link>
            <p style={{ fontSize: "0.875rem", lineHeight: 1.6 }}>
              Premium tech products at the best prices.
            </p>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <p style={{
                color: "white",
                fontWeight: 600,
                fontSize: "0.875rem",
                marginBottom: "1rem",
              }}>
                {title}
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem", listStyle: "none" }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} style={{
                      fontSize: "0.875rem",
                      color: "#9ca3af",
                      textDecoration: "none",
                    }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: "1px solid #1f2937",
          paddingTop: "1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          fontSize: "0.75rem",
        }}>
          <p>© 2026 TechStore. All rights reserved.</p>
          <p>Built with Next.js + TypeScript</p>
        </div>
      </div>
    </footer>
  );
}