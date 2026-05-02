"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import { Product } from "@/types";
import { useCartStore } from "@/lib/store";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore((state) => state.addItem);
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : null;

  return (
    <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Rasm qismi */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          loading="eager"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Badge */}
        {product.badge && (
          <span
            style={{
              position: "absolute",
              top: "0.75rem",
              left: "0.75rem",
              fontSize: "0.75rem",
              fontWeight: 600,
              padding: "0.25rem 0.625rem",
              borderRadius: "999px",
              background:
                product.badge === "Sale"
                  ? "#ef4444"
                  : product.badge === "New"
                    ? "#3b82f6"
                    : "#fbbf24",
              color: product.badge === "Popular" ? "#000" : "#fff",
            }}
          >
            {product.badge}
            {product.badge === "Sale" && discount && ` -${discount}%`}
          </span>
        )}
      </div>

      {/* Ma'lumot qismi */}
      <div style={{ padding: "1rem" }}>
        <p
          style={{
            fontSize: "0.75rem",
            color: "#9ca3af",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: "0.25rem",
          }}
        >
          {product.brand}
        </p>

        <Link
          href={`/products/${product.id}`}
          style={{ textDecoration: "none" }}
        >
          <h3
            style={{
              fontWeight: 600,
              color: "#111827",
              marginBottom: "0.5rem",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
            marginBottom: "0.75rem",
          }}
        >
          <div style={{ display: "flex", gap: "2px" }}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                style={{
                  fill: i < Math.floor(product.rating) ? "#fbbf24" : "#e5e7eb",
                  color: i < Math.floor(product.rating) ? "#fbbf24" : "#e5e7eb",
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
            {product.rating} ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Narx va savat */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <span
              style={{
                fontSize: "1.125rem",
                fontWeight: 700,
                color: "#111827",
              }}
            >
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span
                style={{
                  fontSize: "0.875rem",
                  color: "#9ca3af",
                  textDecoration: "line-through",
                  marginLeft: "0.5rem",
                }}
              >
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <button
            onClick={() => addItem(product)}
            style={{
              background: "#2563eb",
              color: "white",
              padding: "0.625rem",
              borderRadius: "0.75rem",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
            }}
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
