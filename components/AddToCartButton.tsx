"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { Product } from "@/types";

export default function AddToCartButton({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem",
        padding: "1rem",
        borderRadius: "0.75rem",
        border: "none",
        cursor: "pointer",
        fontSize: "1rem",
        fontWeight: 600,
        transition: "all 0.3s",
        background: added ? "#16a34a" : "#2563eb",
        color: "white",
      }}
    >
      {added ? (
        <>
          <Check size={20} />
          Added to Cart!
        </>
      ) : (
        <>
          <ShoppingCart size={20} />
          Add to Cart — ${product.price.toLocaleString()}
        </>
      )}
    </button>
  );
}