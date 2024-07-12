import { Logo } from './';

function Navbar() {
  return (
    <header className="flex items-center justify-between mb-14">
      <nav>
        <ul className="flex gap-6 uppercase">
          {/* active: text-accent border-accent font-semibold */}
          <li className="border-b-2 border-transparent pb-4">Women</li>
          <li>Men</li>
          <li>Kids</li>
        </ul>
      </nav>

      <div className="absolute inset-x-0 mx-auto flex items-center justify-center">
        <Logo />
      </div>

      <div>cart</div>
    </header>
  );
}

export default Navbar;
