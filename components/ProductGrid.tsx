import { Product } from "@/types";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
  title?: string;
};

export default function ProductGrid({ products, title }: Props) {
  if (products.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-gray-400 text-lg">No products found.</p>
      </div>
    );
  }

  return (
    <div>
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-8">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}