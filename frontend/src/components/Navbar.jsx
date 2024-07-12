import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Cart, CartModal, Logo } from './';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      items: [
        {
          id: 1,
          name: 'Item 1',
          price: 50,
          attributes: [
            { type: 'size', values: ['XS', 'S', 'M', 'L'] },
            { type: 'color', values: ['#FF0000', '#0000FF', '#00FF00'] },
          ],
          quantity: 2,
          image:
            'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087',
        },
        {
          id: 2,
          name: 'Item 2',
          price: 40,
          attributes: [
            { type: 'size', values: ['M', 'L'] },
            { type: 'color', values: ['green', 'yellow'] },
          ],
          quantity: 1,
          image:
            'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087',
        },
      ],
    };
  }

  toggleModal = () => {
    this.setState((prevState) => ({ showModal: !prevState.showModal }));
  };

  componentDidMount() {
    this.updateBodyOverflow(this.state.showModal);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.showModal !== this.state.showModal) {
      this.updateBodyOverflow(this.state.showModal);
    }
  }

  componentWillUnmount() {
    document.body.style.overflowY = 'auto';
  }

  updateBodyOverflow(showModal) {
    document.body.style.overflowY = showModal ? 'hidden' : 'auto';
  }

  render() {
    const { showModal, items } = this.state;

    return (
      <header className="relative z-10 flex items-center justify-between">
        <nav className="z-10">
          <ul className="flex gap-6 uppercase">
            <li className="pb-4 border-b-2 cursor-pointer nav-active">Women</li>
            <li className="pb-4 border-b-2 border-transparent cursor-pointer hover:text-primary">
              Men
            </li>
            <li className="pb-4 border-b-2 border-transparent cursor-pointer hover:text-primary">
              Kids
            </li>
          </ul>
        </nav>

        <div className="absolute inset-x-0 flex items-center justify-center mx-auto">
          <Link to="/">
            <Logo />
          </Link>
        </div>

        <div className="relative z-10 cursor-pointer" onClick={this.toggleModal}>
          <Cart />
          {items.length > 0 && (
            <div className="absolute flex items-center justify-center w-5 h-5 -mt-1 -mr-1 text-sm text-white rounded-full -top-1 -right-2 bg-text">
              {items.reduce((total, item) => total + item.quantity, 0)}
            </div>
          )}
        </div>

        {showModal && (
          <div
            className="absolute inset-x-0 z-50 h-screen bg-black opacity-25 top-full -right-20 -left-20"
            onClick={this.toggleModal}
          ></div>
        )}

        {showModal && <CartModal items={items} />}
      </header>
    );
  }
}

export default Navbar;
