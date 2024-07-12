import { ProductCard } from '../components';

function Categories() {
  return (
    <main>
      <h1 className="text-heading mb-20">Women</h1>

      <section className="flex flex-wrap gap-y-8 -mx-2">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </section>
    </main>
  );
}

export default Categories;
