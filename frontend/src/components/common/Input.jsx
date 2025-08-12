import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

function Input({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  error,
  className = '',
  startIcon,
  ...props
}) {
  return (
    <TextField
      variant="outlined"
      label={label}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      error={!!error}
      helperText={error}
      className={className}
      InputProps={
        startIcon
          ? {
              startAdornment: (
                <InputAdornment position="start">{startIcon}</InputAdornment>
              ),
            }
          : undefined
      }	 	  	      	 		 	   	       	 	
      {...props}
    />
  );
}

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
  startIcon: PropTypes.node,
};

export default Input;