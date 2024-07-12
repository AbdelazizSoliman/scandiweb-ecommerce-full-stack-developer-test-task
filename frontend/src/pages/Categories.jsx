import { ProductCard } from '../components';

function Categories() {
  return (
    <main className="mt-14">
    <h1 className="heading-h1 !mb-16">Women</h1>

    <section className="flex flex-wrap -mx-2 gap-y-8">
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
