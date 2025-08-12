import { useState } from 'react';
import { format } from 'date-fns';

// Custom hook for managing date input with formatting and validation
export default function useDateInput(initialValue = '') {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');

  const onChange = (e) => {
    const val = e.target.value;
    setValue(val);
    // Simple validation: check if date is valid and not in the past
    if (val && isNaN(Date.parse(val))) {
      setError('Invalid date');
    } else if (val && new Date(val) < new Date(new Date().toDateString())) {
      setError('Date cannot be in the past');
    } else {
      setError('');
    }
  };

  // Optionally, return formatted date
  const formatted = value ? format(new Date(value), 'yyyy-MM-dd') : '';

  return { value, onChange, error, formatted, setValue };
}
	 	  	      	 		 	   	       	 	
