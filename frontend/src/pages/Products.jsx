import { ProductCard } from '../components';
import { useDataContext } from '../DataContext';

function Products() {
  const { selectedCategory, productsData } = useDataContext();

  return (
    <main className="mt-14">
      <h1 className="heading-h1 !mb-12 !uppercase">{selectedCategory}</h1>

      {!!productsData.length && (
        <section className="grid grid-cols-auto-fill-350 gap-x-4 gap-y-8">
          {productsData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}
    </main>
  );
}

export default Products;
