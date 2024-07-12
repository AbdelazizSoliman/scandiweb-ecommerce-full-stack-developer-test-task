import Logo from './Logo';

function Navbar() {
  return (
    <header className="flex items-center justify-between mb-14">
      <nav>
        <ul className="flex gap-6">
          <li>Women</li>
          <li>Men</li>
          <li>Kids</li>
        </ul>
      </nav>

      <Logo />

      <div>cart</div>
    </header>
  );
}

export default Navbar;
