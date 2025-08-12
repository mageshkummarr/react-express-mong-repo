import { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from './ErrorMessage';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorMessage
          message={
            this.props.customMessage ||
            'Something went wrong. Please try again later.'
          }
        />
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  customMessage: PropTypes.string,
};

export default ErrorBoundary;	 	  	      	 		 	   	       	 	
