import { useState } from 'react';

// Custom hook for managing input state and change handler
export default function useInput(initialValue = '') {
  const [value, setValue] = useState(initialValue);
  const onChange = (e) => setValue(e.target.value);
  const reset = () => setValue(initialValue);
  return { value, onChange, reset, setValue };
}
