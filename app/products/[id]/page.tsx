import { getProductById, products } from "@/lib/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";
import Link from "next/link";
import { ArrowLeft, Star, Shield, Truck, Zap } from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) notFound();

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <main>
      <div className="container" style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
        {/* Back */}
        <Link href="/products" style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          color: "#6b7280",
          textDecoration: "none",
          fontSize: "0.875rem",
          marginBottom: "2rem",
        }}>
          <ArrowLeft size={16} />
          Back to products
        </Link>

        {/* Main grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "3rem",
          alignItems: "start",
        }}>
          {/* Rasm */}
          <div style={{
            background: "#f9fafb",
            borderRadius: "1.5rem",
            overflow: "hidden",
            aspectRatio: "1",
            position: "relative",
          }}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {product.badge && (
              <span style={{
                position: "absolute",
                top: "1rem",
                left: "1rem",
                background: product.badge === "Sale" ? "#ef4444" : product.badge === "New" ? "#3b82f6" : "#f59e0b",
                color: product.badge === "Popular" ? "black" : "white",
                fontSize: "0.75rem",
                fontWeight: 700,
                padding: "0.375rem 0.75rem",
                borderRadius: "999px",
              }}>
                {product.badge}{product.badge === "Sale" && discount && ` -${discount}%`}
              </span>
            )}
          </div>

          {/* Info */}
          <div>
            <p style={{
              fontSize: "0.75rem",
              color: "#9ca3af",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "0.5rem",
            }}>
              {product.brand}
            </p>

            <h1 style={{
              fontSize: "2rem",
              fontWeight: 700,
              color: "#111827",
              marginBottom: "1rem",
              lineHeight: 1.2,
            }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1.5rem",
            }}>
              <div style={{ display: "flex", gap: "2px" }}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    style={{
                      fill: i < Math.floor(product.rating) ? "#f59e0b" : "#e5e7eb",
                      color: i < Math.floor(product.rating) ? "#f59e0b" : "#e5e7eb",
                    }}
                  />
                ))}
              </div>
              <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                {product.rating} · {product.reviewCount.toLocaleString()} reviews
              </span>
            </div>

            {/* Narx */}
            <div style={{
              display: "flex",
              alignItems: "baseline",
              gap: "0.75rem",
              marginBottom: "2rem",
              padding: "1.5rem",
              background: "#f9fafb",
              borderRadius: "1rem",
            }}>
              <span style={{ fontSize: "2.5rem", fontWeight: 800, color: "#111827" }}>
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <>
                  <span style={{ fontSize: "1.25rem", color: "#9ca3af", textDecoration: "line-through" }}>
                    ${product.originalPrice.toLocaleString()}
                  </span>
                  <span style={{
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    color: "#ef4444",
                    background: "#fee2e2",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "0.5rem",
                  }}>
                    Save ${product.originalPrice - product.price}
                  </span>
                </>
              )}
            </div>

            {/* Specs */}
            <div style={{ marginBottom: "2rem" }}>
              <p style={{ fontWeight: 600, color: "#111827", marginBottom: "0.75rem" }}>
                Key Features
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {product.specs.map((spec) => (
                  <li key={spec} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    fontSize: "0.875rem",
                    color: "#374151",
                  }}>
                    <span style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#2563eb",
                      flexShrink: 0,
                    }} />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            {/* Add to cart */}
            <AddToCartButton product={product} />

            {/* Garantiya */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "0.75rem",
              marginTop: "1.5rem",
            }}>
              {[
                { icon: Truck, text: "Free shipping" },
                { icon: Shield, text: "2yr warranty" },
                { icon: Zap, text: "Fast delivery" },
              ].map((item) => (
                <div key={item.text} style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.375rem",
                  padding: "0.75rem",
                  background: "#f9fafb",
                  borderRadius: "0.75rem",
                  textAlign: "center",
                }}>
                  <item.icon size={18} color="#2563eb" />
                  <span style={{ fontSize: "0.7rem", color: "#6b7280" }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}