import Link from "next/link";
import { CheckCircle, ShoppingBag } from "lucide-react";

export default function SuccessPage() {
  return (
    <main>
      <div className="container" style={{
        paddingTop: "5rem",
        paddingBottom: "5rem",
        textAlign: "center",
        maxWidth: "480px",
        margin: "0 auto",
      }}>
        <div style={{
          width: "80px",
          height: "80px",
          background: "#dcfce7",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 1.5rem",
        }}>
          <CheckCircle size={40} color="#16a34a" />
        </div>

        <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#111827", marginBottom: "0.75rem" }}>
          Order Confirmed!
        </h1>

        <p style={{ color: "#6b7280", marginBottom: "0.5rem", lineHeight: 1.6 }}>
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        <p style={{ color: "#9ca3af", fontSize: "0.875rem", marginBottom: "2.5rem" }}>
          A confirmation email will be sent to your inbox shortly.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <Link href="/products" style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            background: "#2563eb",
            color: "white",
            fontWeight: 600,
            padding: "1rem 2rem",
            borderRadius: "0.75rem",
            textDecoration: "none",
          }}>
            <ShoppingBag size={18} />
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}