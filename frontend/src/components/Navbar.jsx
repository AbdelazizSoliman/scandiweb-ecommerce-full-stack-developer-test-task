import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Cart, CartModal, Logo } from './';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  toggleModal = () => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    const { showModal } = this.state;
    if (prevState.showModal !== showModal) {
      document.body.style.overflowY = showModal ? 'hidden' : 'auto';
    }
  }

  render() {
    const { showModal } = this.state;

    const products = [
      {
        id: 'huarache-x-stussy-le',
        name: 'Nike Air Huarache Le',
        prices: [
          {
            amount: 144.69,
            currency: {
              label: 'USD',
              symbol: '$',
            },
          },
        ],
        attributes: [
          {
            id: 'Size',
            items: [
              { displayValue: '40', value: '40' },
              { displayValue: '41', value: '41' },
              { displayValue: '42', value: '42' },
              { displayValue: '43', value: '43' },
            ],
          },
        ],
        description: '<p>Great sneakers for everyday use!</p>',
        gallery: [
          'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087',
          'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087',
          'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087',
          'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087',
          'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087',
        ],
        quantity: 2,
        image:
          'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087',
      },
    ];

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

        <div
          className="relative z-10 cursor-pointer"
          onClick={this.toggleModal}
        >
          <Cart />
          {products.length > 0 && (
            <div className="absolute flex items-center justify-center w-5 h-5 -mt-1 -mr-1 text-sm text-white rounded-full -top-1 -right-2 bg-text">
              {products.reduce((total, product) => total + product.quantity, 0)}
            </div>
          )}
        </div>

        {showModal && (
          <div
            className="absolute inset-x-0 z-50 h-screen bg-black opacity-25 top-full -right-20 -left-20"
            onClick={this.toggleModal}
          ></div>
        )}

        {showModal && <CartModal products={products} />}
      </header>
    );
  }
}

export default Navbar;
