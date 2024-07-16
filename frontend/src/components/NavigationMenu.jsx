import { Link, useLocation } from 'react-router-dom';
import { useDataContext } from '../DataContext';
import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../graphql/queries';

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

    const category = new URLSearchParams(location.search).get('category');
    setSelectedCategory(category ?? categoriesData[0]?.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriesData]);

  const handleCategoryChange = (category) => {
    fetchProducts({ variables: { category } });
    setSelectedCategory(category);
  };

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
                data-testid={
                  isSelected ? 'active-category-link' : 'category-link'
                }
                onClick={() => handleCategoryChange(category)}
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
