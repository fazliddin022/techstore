"use client";

import Link from "next/link";
import { ShoppingCart, Zap, Search } from "lucide-react";
import { useCartStore } from "@/lib/store";

export default function Header() {
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 50,
      background: "rgba(255,255,255,0.85)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid #f3f4f6",
    }}>
      <div className="container">
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
        }}>
          {/* Logo */}
          <Link href="/" style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontWeight: 700,
            fontSize: "1.25rem",
            color: "#111827",
            textDecoration: "none",
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

          {/* Nav */}
          <nav style={{ display: "flex", gap: "2rem" }}>
            {[
              { href: "/", label: "Home" },
              { href: "/products", label: "Products" },
              { href: "/products?category=phone", label: "Phones" },
              { href: "/products?category=laptop", label: "Laptops" },
            ].map((link) => (
              <Link key={link.href} href={link.href} style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#6b7280",
                textDecoration: "none",
              }}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <button style={{
              padding: "0.5rem",
              borderRadius: "0.75rem",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: "#6b7280",
            }}>
              <Search size={20} />
            </button>

            <Link href="/cart" style={{
              position: "relative",
              padding: "0.5rem",
              borderRadius: "0.75rem",
              color: "#6b7280",
              textDecoration: "none",
              display: "flex",
            }}>
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span style={{
                  position: "absolute",
                  top: "-4px",
                  right: "-4px",
                  background: "#2563eb",
                  color: "white",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}