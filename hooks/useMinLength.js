import { useState } from 'react';

function useMinLength(initialValue, minLength) {
  // Create a state for the input value
  const [value, setValue] = useState(initialValue);

  // Create a state for the error message
  const [error, setError] = useState(null);

  // Create a function that will be called when the input value changes
  function onChange1(event) {
    // Update the input value
    setValue(event.target.value);

    // Check if the input value has the minimum length
    if (event.target.value.length < minLength) {
      // If the input value doesn't have the minimum length, show an error message
      setError(`Input must be at least ${minLength} characters long.`);
    } else {
      // If the input value has the minimum length, clear the error message
      setError(null);
    }
  }

  // Return the value, the error message, and the function that will be called when the input value changes
  return {
    value,
    error,
    onChange1,
  };
}

export default useMinLength;
