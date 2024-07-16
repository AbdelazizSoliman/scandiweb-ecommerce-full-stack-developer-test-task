import { Link, useLocation } from 'react-router-dom';
import { useDataContext } from '../DataContext';
import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../GraphQl/Queries';

function NavigationMenu() {
  const location = useLocation();
  const [categories, setCategories] = useState([]);

  const {
    categoriesData,
    selectedCategory,
    setSelectedCategory,
    setProductsData,
  } = useDataContext();

  const [fetchProducts] = useLazyQuery(GET_PRODUCTS, {
    onCompleted: (data) => setProductsData(data.products),
  });

  useEffect(() => {
    setCategories(categoriesData.map((category) => category.name));
  }, [categoriesData]);

  useEffect(() => {
    const category = new URLSearchParams(location.search).get('category');

    setSelectedCategory(category ?? 'all');
  }, [location.search, setSelectedCategory]);

  return (
    <nav className="z-10">
      <ul className="flex gap-6 uppercase">
        {categories.map((category) => {
          const isSelected = category === selectedCategory;

          return (
            <li key={category}>
              <Link
                to={`/?category=${category}`}
                className={`block pb-4 border-b-2 ${
                  isSelected
                    ? 'nav-active'
                    : 'border-transparent hover:text-primary'
                }`}
                onClick={() => fetchProducts({ variables: { category } })}
              >
                {category}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavigationMenu;
