import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main>
      <div className="container" style={{
        paddingTop: "5rem",
        paddingBottom: "5rem",
        textAlign: "center",
      }}>
        <div style={{
          width: "80px",
          height: "80px",
          background: "#eff6ff",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 1.5rem",
        }}>
          <SearchX size={36} color="#2563eb" />
        </div>

        <h1 style={{
          fontSize: "6rem",
          fontWeight: 800,
          color: "#e5e7eb",
          lineHeight: 1,
          marginBottom: "1rem",
        }}>
          404
        </h1>

        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827", marginBottom: "0.75rem" }}>
          Page not found
        </h2>

        <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link href="/" style={{
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
          Back to Home
        </Link>
      </div>
    </main>
  );
}