import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { getCategoriesQuery } from '../GraphQl/Queries';
import { useEffect, useState } from 'react';
import { Loading } from './';

function NavigationMenu() {
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const { data, loading } = useQuery(getCategoriesQuery);

  useEffect(() => {
    if (data) {
      setCategories(data?.categories.map((category) => category.name));
    }
  }, [data, loading]);

  if (loading) {
    return <Loading />;
  }

  return (
    <nav className="z-10">
      <ul className="flex gap-6 uppercase">
        {categories.map((category, index) => {
          const isFirstCategory = index === 0;
          const isSelected =
            location.search.includes(`categories=${category}`) ||
            (location.pathname === '/' && isFirstCategory && !location.search);

          return (
            <li
              key={category}
              className={`pb-4 border-b-2 ${
                isSelected
                  ? 'nav-active'
                  : 'border-transparent hover:text-primary'
              }`}
            >
              <Link to={`?categories=${category}`}>{category}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

NavigationMenu.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
};

export default NavigationMenu;
