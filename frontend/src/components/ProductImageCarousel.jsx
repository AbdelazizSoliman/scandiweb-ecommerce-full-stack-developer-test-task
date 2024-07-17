import { Component } from 'react';
import PropTypes from 'prop-types';
import { Arrow } from './';

class ProductImageCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      mainImageHeight: null,
    };

    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleMainImageLoad = this.handleMainImageLoad.bind(this);
  }

  handleNext() {
    this.setState((prevState) => ({
      currentIndex: (prevState.currentIndex + 1) % this.props.images.length,
    }));
  }

  handlePrev() {
    this.setState((prevState) => ({
      currentIndex:
        (prevState.currentIndex - 1 + this.props.images.length) %
        this.props.images.length,
    }));
  }

  handleMainImageLoad(e) {
    const { clientHeight } = e.target;
    const maxHeightRatio = 0.6;
    const maxHeight = window.innerHeight * maxHeightRatio;
    const mainImageHeight = Math.min(clientHeight, maxHeight);

    this.setState({ mainImageHeight });
  }

  render() {
    const { images = [], alt = 'Product' } = this.props;
    const { currentIndex, mainImageHeight } = this.state;

    return (
      <section className="mb-6 md:w-2/3 md:mb-0" data-testid="product-gallery">
        {!!images?.length && (
          <div className="relative flex">
            <div
              className="w-1/5 max-h-screen overflow-y-auto"
              style={{ maxHeight: mainImageHeight }}
            >
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={alt}
                  className={`w-full ${
                    index === currentIndex ? 'opacity-50' : 'opacity-100'
                  } cursor-pointer`}
                  onClick={() => this.setState({ currentIndex: index })}
                />
              ))}
            </div>
            <div className="relative w-4/5">
              <img
                src={images[currentIndex]}
                alt={alt}
                className="object-contain w-full h-auto"
                onLoad={this.handleMainImageLoad}
                style={{ maxHeight: mainImageHeight || '100vh' }}
              />

              <button
                className="absolute p-2 text-gray-300 transition-colors duration-300 transform -translate-y-1/2 bg-text top-1/2 left-4 hover:text-white"
                onClick={this.handlePrev}
              >
                <Arrow direction="left" />
              </button>
              <button
                className="absolute p-2 text-gray-300 transition-colors duration-300 transform -translate-y-1/2 bg-text top-1/2 right-4 hover:text-white"
                onClick={this.handleNext}
              >
                <Arrow />
              </button>
            </div>
          </div>
        )}
      </section>
    );
  }
}

ProductImageCarousel.propTypes = {
  images: PropTypes.array,
  alt: PropTypes.string,
};

export default ProductImageCarousel;
