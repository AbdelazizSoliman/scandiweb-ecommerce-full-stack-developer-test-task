import { Link } from 'react-router-dom';
import { Cart, Logo } from './';

function Navbar() {
  return (
    <header className="flex items-center justify-between mb-14 relative z-10">
      <nav>
        <ul className="flex gap-6 uppercase">
          {/* active: text-primary border-primary font-semibold */}
          <li className="border-b-2 border-transparent pb-4">Women</li>
          <li>Men</li>
          <li>Kids</li>
        </ul>
      </nav>

      <div className="absolute inset-x-0 mx-auto flex items-center justify-center">
        <Link to="/">
          <Logo />
        </Link>
      </div>

      <div className="cursor-pointer relative z-10">
        <Cart />
      </div>
    </header>
  );
}

export default Navbar;
