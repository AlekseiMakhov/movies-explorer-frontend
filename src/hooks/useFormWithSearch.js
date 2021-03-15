import { useState } from 'react';

export function useFormWithSearch() {
    
    const [value, setValue] = useState({});
  
    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        setValue(value);
    };

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );
    
    return { values, handleChange, errors, isValid, resetForm };
};