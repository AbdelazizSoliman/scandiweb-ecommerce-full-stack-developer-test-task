import PropTypes from 'prop-types';

function ActionBtn({ text, onClick, type = 'button' }) {
  return (
    <button
      type={type}
      className="flex items-center justify-center w-6 h-6 transition-colors border border-text hover:bg-text hover:text-white"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

ActionBtn.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default ActionBtn;
