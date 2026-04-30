import { products } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";
import Link from "next/link";
import { ArrowRight, Zap, Shield, Truck } from "lucide-react";

const FEATURES = [
  { icon: Truck, title: "Free Shipping", desc: "On orders over $50" },
  { icon: Shield, title: "2 Year Warranty", desc: "On all products" },
  { icon: Zap, title: "Fast Delivery", desc: "2-3 business days" },
];

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <main>
      {/* Hero */}
      <section style={{
        background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #4338ca 100%)",
        color: "white",
        width: "100%",
      }}>
        <div className="container" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
          <div style={{ maxWidth: "640px" }}>
            <span style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.2)",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "white",
              fontSize: "0.875rem",
              fontWeight: 500,
              padding: "0.375rem 1rem",
              borderRadius: "999px",
              marginBottom: "1.5rem",
            }}>
              ✦ New arrivals just dropped
            </span>

            <h1 style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: "1.5rem",
              letterSpacing: "-0.02em",
            }}>
              Premium Tech,<br />
              <span style={{ color: "#bfdbfe" }}>Best Prices.</span>
            </h1>

            <p style={{
              fontSize: "1.125rem",
              color: "#dbeafe",
              marginBottom: "2.5rem",
              lineHeight: 1.7,
            }}>
              Discover the latest phones, laptops, and accessories.
              Curated for tech enthusiasts.
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/products" style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "white",
                color: "#1d4ed8",
                fontWeight: 600,
                padding: "0.875rem 2rem",
                borderRadius: "0.75rem",
                textDecoration: "none",
                fontSize: "1rem",
              }}>
                Shop Now <ArrowRight size={18} />
              </Link>
              <Link href="/products?category=phone" style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                border: "2px solid rgba(255,255,255,0.5)",
                color: "white",
                fontWeight: 600,
                padding: "0.875rem 2rem",
                borderRadius: "0.75rem",
                textDecoration: "none",
                fontSize: "1rem",
              }}>
                View Phones
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ borderBottom: "1px solid #f3f4f6" }}>
        <div className="container" style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
          }}>
            {FEATURES.map((feature) => (
              <div key={feature.title} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{
                  background: "#eff6ff",
                  padding: "0.75rem",
                  borderRadius: "0.75rem",
                  flexShrink: 0,
                }}>
                  <feature.icon size={22} color="#2563eb" />
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: "#111827" }}>{feature.title}</p>
                  <p style={{ fontSize: "0.875rem", color: "#9ca3af" }}>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="container" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
            <div>
              <h2 style={{ fontSize: "1.875rem", fontWeight: 700, color: "#111827" }}>
                Featured Products
              </h2>
              <p style={{ color: "#9ca3af", marginTop: "0.25rem" }}>Hand-picked top sellers</p>
            </div>
            <Link href="/products" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#2563eb",
              fontWeight: 500,
              textDecoration: "none",
              fontSize: "0.875rem",
            }}>
              View all <ArrowRight size={16} />
            </Link>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* Categories */}
      <section style={{ background: "#f9fafb" }}>
        <div className="container" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
          <h2 style={{ fontSize: "1.875rem", fontWeight: 700, color: "#111827", marginBottom: "2rem" }}>
            Shop by Category
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "1rem",
          }}>
            {(["phone", "laptop", "headphone", "tablet"] as const).map((cat) => (
              <Link key={cat} href={`/products?category=${cat}`} style={{
                display: "block",
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "1rem",
                padding: "1.5rem",
                textAlign: "center",
                textDecoration: "none",
                transition: "all 0.2s",
              }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>
                  {cat === "phone" ? "📱" : cat === "laptop" ? "💻" : cat === "headphone" ? "🎧" : "📟"}
                </div>
                <p style={{ fontWeight: 600, color: "#111827", textTransform: "capitalize" }}>
                  {cat}s
                </p>
                <p style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.25rem" }}>
                  {products.filter((p) => p.category === cat).length} products
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}