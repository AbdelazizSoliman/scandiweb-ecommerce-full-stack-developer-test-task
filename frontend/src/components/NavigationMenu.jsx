import { Link, useLocation } from 'react-router-dom';
import { useDataContext } from '../DataContext';
import { useEffect, useState } from 'react';

function NavigationMenu() {
  const location = useLocation();
  const { categoriesData } = useDataContext();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData.map((category) => category.name));
    }
  }, [categoriesData]);

  return (
    <nav className="z-10">
      <ul className="flex gap-6 uppercase">
        {categories.map((category, index) => {
          const isFirstCategory = index === 0;
          const isSelected =
            location.search.includes(`categories=${category}`) ||
            (location.pathname === '/' && isFirstCategory && !location.search);

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
