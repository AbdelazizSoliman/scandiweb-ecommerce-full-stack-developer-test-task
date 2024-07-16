import { ProductCard, Spinner } from '../components';
import { useDataContext } from '../DataContext';

function Products() {
  const { selectedCategory, productsData } = useDataContext();

  return (
    <main className="mt-14">
      <h1 className="heading-h1 !mb-16 !uppercase">{selectedCategory}</h1>

      {!productsData.length ? (
        <Spinner />
      ) : (
        <section className="flex flex-wrap -mx-2 gap-y-8">
          {productsData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}
    </main>
  );
}

export default Products;
