"use client";

import { useCartStore } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <main>
        <div className="container" style={{
          paddingTop: "5rem",
          paddingBottom: "5rem",
          textAlign: "center",
        }}>
          <ShoppingBag size={64} color="#e5e7eb" style={{ margin: "0 auto 1.5rem" }} />
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827", marginBottom: "0.5rem" }}>
            Your cart is empty
          </h1>
          <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
            Add some products to get started!
          </p>
          <Link href="/products" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "#2563eb",
            color: "white",
            fontWeight: 600,
            padding: "0.875rem 2rem",
            borderRadius: "0.75rem",
            textDecoration: "none",
          }}>
            Browse Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="container" style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
        {/* Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "2rem",
        }}>
          <div>
            <Link href="/products" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#6b7280",
              textDecoration: "none",
              fontSize: "0.875rem",
              marginBottom: "0.5rem",
            }}>
              <ArrowLeft size={16} /> Continue shopping
            </Link>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#111827" }}>
              Shopping Cart
            </h1>
          </div>
          <button
            onClick={clearCart}
            style={{
              fontSize: "0.875rem",
              color: "#ef4444",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Clear all
          </button>
        </div>

        {/* 2 column layout */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "2rem",
        }}>
          {/* Items */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {items.map((item) => (
              <div key={item.product.id} style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr auto",
                gap: "1.25rem",
                alignItems: "center",
                background: "white",
                border: "1px solid #f3f4f6",
                borderRadius: "1rem",
                padding: "1rem",
              }}>
                {/* Rasm */}
                <div style={{
                  borderRadius: "0.75rem",
                  overflow: "hidden",
                  background: "#f9fafb",
                  aspectRatio: "1",
                  position: "relative",
                  width: "80px",
                  height: "80px",
                }}>
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>

                {/* Info */}
                <div>
                  <p style={{ fontSize: "0.75rem", color: "#9ca3af", marginBottom: "0.25rem" }}>
                    {item.product.brand}
                  </p>
                  <p style={{ fontWeight: 600, color: "#111827", marginBottom: "0.5rem" }}>
                    {item.product.name}
                  </p>
                  <p style={{ fontWeight: 700, color: "#2563eb" }}>
                    ${(item.product.price * item.quantity).toLocaleString()}
                  </p>
                </div>

                {/* Miqdor + o'chirish */}
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: "0.75rem",
                }}>
                  {/* Quantity */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.75rem",
                    padding: "0.25rem",
                  }}>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      style={{
                        width: "28px",
                        height: "28px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "0.5rem",
                        border: "none",
                        background: "#f3f4f6",
                        cursor: "pointer",
                        color: "#374151",
                      }}
                    >
                      <Minus size={14} />
                    </button>
                    <span style={{
                      minWidth: "24px",
                      textAlign: "center",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                    }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      style={{
                        width: "28px",
                        height: "28px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "0.5rem",
                        border: "none",
                        background: "#f3f4f6",
                        cursor: "pointer",
                        color: "#374151",
                      }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => removeItem(item.product.id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#ef4444",
                      padding: "0.25rem",
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div style={{
            background: "#f9fafb",
            borderRadius: "1.25rem",
            padding: "1.5rem",
            height: "fit-content",
            border: "1px solid #e5e7eb",
          }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111827", marginBottom: "1.5rem" }}>
              Order Summary
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", color: "#6b7280" }}>
                <span>Subtotal ({items.reduce((t, i) => t + i.quantity, 0)} items)</span>
                <span>${getTotalPrice().toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", color: "#6b7280" }}>
                <span>Shipping</span>
                <span style={{ color: "#16a34a" }}>Free</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", color: "#6b7280" }}>
                <span>Tax (8%)</span>
                <span>${Math.round(getTotalPrice() * 0.08).toLocaleString()}</span>
              </div>
              <div style={{
                height: "1px",
                background: "#e5e7eb",
                margin: "0.5rem 0",
              }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, color: "#111827", fontSize: "1.125rem" }}>
                <span>Total</span>
                <span>${Math.round(getTotalPrice() * 1.08).toLocaleString()}</span>
              </div>
            </div>

            <Link href="/checkout" style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              background: "#2563eb",
              color: "white",
              fontWeight: 600,
              padding: "1rem",
              borderRadius: "0.75rem",
              textDecoration: "none",
              fontSize: "1rem",
              marginBottom: "0.75rem",
            }}>
              Proceed to Checkout
            </Link>

            <Link href="/products" style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#6b7280",
              fontWeight: 500,
              padding: "0.75rem",
              borderRadius: "0.75rem",
              textDecoration: "none",
              fontSize: "0.875rem",
              border: "1px solid #e5e7eb",
              background: "white",
            }}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}