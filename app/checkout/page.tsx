"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/store";
import Link from "next/link";
import { ArrowLeft, CreditCard, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

type FormData = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  country: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
};

const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  border: "1px solid #e5e7eb",
  borderRadius: "0.75rem",
  fontSize: "0.875rem",
  outline: "none",
  background: "white",
  color: "#111827",
};

const LABEL_STYLE: React.CSSProperties = {
  display: "block",
  fontSize: "0.875rem",
  fontWeight: 500,
  color: "#374151",
  marginBottom: "0.5rem",
};

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormData>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const total = Math.round(getTotalPrice() * 1.08);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Validatsiya
    const required = ["email", "firstName", "lastName", "address", "city", "cardNumber", "expiry", "cvv"];
    const empty = required.filter((k) => !form[k as keyof FormData]);

    if (empty.length > 0) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    // Real Stripe bo'lgan joyda API call ketadi
    // Hozir simulatsiya qilamiz
    await new Promise((resolve) => setTimeout(resolve, 2000));

    clearCart();
    router.push("/checkout/success");
  };

  if (items.length === 0) {
    return (
      <main>
        <div className="container" style={{ paddingTop: "4rem", textAlign: "center" }}>
          <p style={{ color: "#6b7280", marginBottom: "1rem" }}>Your cart is empty.</p>
          <Link href="/products" style={{ color: "#2563eb", textDecoration: "none" }}>
            Browse Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="container" style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
        {/* Back */}
        <Link href="/cart" style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          color: "#6b7280",
          textDecoration: "none",
          fontSize: "0.875rem",
          marginBottom: "2rem",
        }}>
          <ArrowLeft size={16} /> Back to cart
        </Link>

        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#111827", marginBottom: "2rem" }}>
          Checkout
        </h1>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
          alignItems: "start",
        }}>
          {/* Form */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

            {/* Contact */}
            <div style={{
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "1.25rem",
              padding: "1.5rem",
            }}>
              <h2 style={{ fontWeight: 700, color: "#111827", marginBottom: "1.25rem" }}>
                Contact Information
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label style={LABEL_STYLE}>Email *</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                    style={INPUT_STYLE}
                  />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={LABEL_STYLE}>First name *</label>
                    <input
                      name="firstName"
                      placeholder="John"
                      value={form.firstName}
                      onChange={handleChange}
                      style={INPUT_STYLE}
                    />
                  </div>
                  <div>
                    <label style={LABEL_STYLE}>Last name *</label>
                    <input
                      name="lastName"
                      placeholder="Doe"
                      value={form.lastName}
                      onChange={handleChange}
                      style={INPUT_STYLE}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping */}
            <div style={{
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "1.25rem",
              padding: "1.5rem",
            }}>
              <h2 style={{ fontWeight: 700, color: "#111827", marginBottom: "1.25rem" }}>
                Shipping Address
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label style={LABEL_STYLE}>Address *</label>
                  <input
                    name="address"
                    placeholder="123 Main Street"
                    value={form.address}
                    onChange={handleChange}
                    style={INPUT_STYLE}
                  />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={LABEL_STYLE}>City *</label>
                    <input
                      name="city"
                      placeholder="Tashkent"
                      value={form.city}
                      onChange={handleChange}
                      style={INPUT_STYLE}
                    />
                  </div>
                  <div>
                    <label style={LABEL_STYLE}>Country</label>
                    <input
                      name="country"
                      placeholder="Uzbekistan"
                      value={form.country}
                      onChange={handleChange}
                      style={INPUT_STYLE}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div style={{
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "1.25rem",
              padding: "1.5rem",
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1.25rem",
              }}>
                <h2 style={{ fontWeight: 700, color: "#111827" }}>
                  Payment Details
                </h2>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  fontSize: "0.75rem",
                  color: "#6b7280",
                }}>
                  <Lock size={12} />
                  Secured
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label style={LABEL_STYLE}>Card number *</label>
                  <div style={{ position: "relative" }}>
                    <input
                      name="cardNumber"
                      placeholder="4242 4242 4242 4242"
                      value={form.cardNumber}
                      onChange={handleChange}
                      maxLength={19}
                      style={{ ...INPUT_STYLE, paddingRight: "3rem" }}
                    />
                    <CreditCard size={18} style={{
                      position: "absolute",
                      right: "1rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#9ca3af",
                    }} />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={LABEL_STYLE}>Expiry *</label>
                    <input
                      name="expiry"
                      placeholder="MM/YY"
                      value={form.expiry}
                      onChange={handleChange}
                      maxLength={5}
                      style={INPUT_STYLE}
                    />
                  </div>
                  <div>
                    <label style={LABEL_STYLE}>CVV *</label>
                    <input
                      name="cvv"
                      placeholder="123"
                      value={form.cvv}
                      onChange={handleChange}
                      maxLength={3}
                      style={INPUT_STYLE}
                    />
                  </div>
                </div>

                <p style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                  Test card: 4242 4242 4242 4242 · 12/26 · 123
                </p>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div style={{
            background: "#f9fafb",
            border: "1px solid #e5e7eb",
            borderRadius: "1.25rem",
            padding: "1.5rem",
            position: "sticky",
            top: "80px",
          }}>
            <h2 style={{ fontWeight: 700, color: "#111827", marginBottom: "1.25rem" }}>
              Order Summary
            </h2>

            {/* Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.25rem" }}>
              {items.map((item) => (
                <div key={item.product.id} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.875rem",
                }}>
                  <span style={{ color: "#374151" }}>
                    {item.product.name}
                    <span style={{ color: "#9ca3af" }}> ×{item.quantity}</span>
                  </span>
                  <span style={{ fontWeight: 600, color: "#111827" }}>
                    ${(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ height: "1px", background: "#e5e7eb", marginBottom: "1rem" }} />

            {/* Totals */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", color: "#6b7280" }}>
                <span>Subtotal</span>
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
              <div style={{ height: "1px", background: "#e5e7eb", margin: "0.5rem 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "1.125rem", color: "#111827" }}>
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>

            {/* Pay button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                background: loading ? "#93c5fd" : "#2563eb",
                color: "white",
                fontWeight: 600,
                padding: "1rem",
                borderRadius: "0.75rem",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: "1rem",
                transition: "all 0.2s",
              }}
            >
              {loading ? (
                "Processing..."
              ) : (
                <>
                  <Lock size={18} />
                  Pay ${total.toLocaleString()}
                </>
              )}
            </button>

            <p style={{
              fontSize: "0.75rem",
              color: "#9ca3af",
              textAlign: "center",
              marginTop: "0.75rem",
            }}>
              🔒 Your payment info is secure and encrypted
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}