import { products } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";
import Link from "next/link";
import { ArrowRight, Zap, Shield, Truck } from "lucide-react";

const FEATURES = [
  {
    icon: Truck,
    title: "Free Shipping",
    desc: "On orders over $50",
  },
  {
    icon: Shield,
    title: "2 Year Warranty",
    desc: "On all products",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    desc: "2-3 business days",
  },
];

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl">
            <span className="inline-block bg-blue-500 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              ✦ New arrivals just dropped
            </span>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Premium Tech,
              <br />
              <span className="text-blue-200">Best Prices.</span>
            </h1>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Discover the latest phones, laptops, and accessories. Curated for tech enthusiasts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors"
              >
                Shop Now
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/products?category=phone"
                className="inline-flex items-center justify-center gap-2 border border-blue-400 text-white font-semibold px-8 py-4 rounded-xl hover:bg-blue-600 transition-colors"
              >
                View Phones
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="flex items-center gap-4"
              >
                <div className="bg-blue-50 p-3 rounded-xl">
                  <feature.icon size={24} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{feature.title}</p>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <p className="text-gray-500 mt-1">Hand-picked top sellers</p>
          </div>
          <Link
            href="/products"
            className="hidden sm:inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            View all
            <ArrowRight size={16} />
          </Link>
        </div>
        <ProductGrid products={featuredProducts} />
      </section>

      {/* Categories */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(["phone", "laptop", "headphone", "tablet"] as const).map((cat) => (
              <Link
                key={cat}
                href={`/products?category=${cat}`}
                className="group bg-white border border-gray-200 rounded-2xl p-6 text-center hover:border-blue-300 hover:shadow-md transition-all duration-300"
              >
                <div className="text-4xl mb-3">
                  {cat === "phone" ? "📱" : cat === "laptop" ? "💻" : cat === "headphone" ? "🎧" : "📟"}
                </div>
                <p className="font-semibold text-gray-900 capitalize group-hover:text-blue-600 transition-colors">
                  {cat}s
                </p>
                <p className="text-sm text-gray-400 mt-1">
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