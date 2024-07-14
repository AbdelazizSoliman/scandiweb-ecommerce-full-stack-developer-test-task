import { Link, useLocation } from 'react-router-dom';
import { useDataContext } from '../DataContext';
import { useEffect, useState } from 'react';

function NavigationMenu() {
  const location = useLocation();
  const { categoriesData, selectedCategory, setSelectedCategory } =
    useDataContext();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(categoriesData.map((category) => category.name));
  }, [categoriesData]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('categories');
    if (category) {
      setSelectedCategory(category);
    }
  }, [location.search, setSelectedCategory]);

  return (
    <nav className="z-10">
      <ul className="flex gap-6 uppercase">
        {categories.map((category) => {
          const isSelected = category === selectedCategory;

          return (
            <li key={category}>
              <Link
                to={`?categories=${category}`}
                className={`pb-4 border-b-2 ${
                  isSelected
                    ? 'nav-active'
                    : 'border-transparent hover:text-primary'
                }`}
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
