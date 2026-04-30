"use client";

import { useState, useMemo } from "react";
import { products } from "@/lib/products";
import { Product } from "@/types";
import ProductGrid from "@/components/ProductGrid";
import { Search, SlidersHorizontal } from "lucide-react";

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "phone", label: "📱 Phones" },
  { value: "laptop", label: "💻 Laptops" },
  { value: "headphone", label: "🎧 Headphones" },
  { value: "tablet", label: "📟 Tablets" },
];

const SORT_OPTIONS = [
  { value: "default", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");

  const filtered = useMemo(() => {
    let result = [...products];

    // Qidiruv
    if (search) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Kategoriya
    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    // Saralash
    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [search, category, sort]);

  return (
    <main>
      {/* Page header */}
      <div style={{ background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
        <div className="container" style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#111827" }}>
            All Products
          </h1>
          <p style={{ color: "#6b7280", marginTop: "0.25rem" }}>
            {filtered.length} products found
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
        {/* Filters */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "2rem",
          alignItems: "center",
        }}>
          {/* Search */}
          <div style={{ position: "relative", flex: "1", minWidth: "200px" }}>
            <Search size={16} style={{
              position: "absolute",
              left: "0.875rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#9ca3af",
            }} />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                paddingLeft: "2.5rem",
                paddingRight: "1rem",
                paddingTop: "0.625rem",
                paddingBottom: "0.625rem",
                border: "1px solid #e5e7eb",
                borderRadius: "0.75rem",
                fontSize: "0.875rem",
                outline: "none",
                background: "white",
              }}
            />
          </div>

          {/* Sort */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <SlidersHorizontal size={16} color="#6b7280" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{
                padding: "0.625rem 1rem",
                border: "1px solid #e5e7eb",
                borderRadius: "0.75rem",
                fontSize: "0.875rem",
                background: "white",
                cursor: "pointer",
                outline: "none",
              }}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category tabs */}
        <div style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
        }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              style={{
                padding: "0.5rem 1.25rem",
                borderRadius: "999px",
                fontSize: "0.875rem",
                fontWeight: 500,
                border: "1px solid",
                cursor: "pointer",
                transition: "all 0.2s",
                background: category === cat.value ? "#2563eb" : "white",
                color: category === cat.value ? "white" : "#6b7280",
                borderColor: category === cat.value ? "#2563eb" : "#e5e7eb",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products */}
        <ProductGrid products={filtered} />
      </div>
    </main>
  );
}