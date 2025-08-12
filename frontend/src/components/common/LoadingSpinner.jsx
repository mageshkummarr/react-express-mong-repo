import PropTypes from 'prop-types';

function LoadingSpinner({ fullScreen = false }) {
  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? 'h-screen' : 'h-32'
      }`}
    >
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}

LoadingSpinner.propTypes = {
  fullScreen: PropTypes.bool,
};

export default LoadingSpinner;