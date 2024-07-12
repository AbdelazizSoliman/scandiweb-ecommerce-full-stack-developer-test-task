import { Component } from 'react';
import { ProductCard } from '../components';

class Categories extends Component {
  render() {
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
}

export default Categories;
