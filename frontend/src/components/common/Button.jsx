import PropTypes from 'prop-types';
import { Button as MuiButton } from '@mui/material';

const Button = ({ children, variant = 'contained', size = 'medium', ...props }) => {
  return (
    <MuiButton variant={variant} size={size} {...props}>
      {children}
    </MuiButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default Button;