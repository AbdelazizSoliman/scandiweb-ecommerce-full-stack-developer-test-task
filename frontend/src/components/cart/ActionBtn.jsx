import PropTypes from 'prop-types';

function ActionBtn({ text, onClick }) {
  return (
    <button
      className="flex items-center justify-center w-6 h-6 transition-colors border border-text hover:bg-text hover:text-white"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

ActionBtn.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default ActionBtn;
