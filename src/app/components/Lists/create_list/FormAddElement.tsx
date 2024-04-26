// components/FormComponent.tsx

import React, { useState } from 'react';
import styles from './FormAddElement.module.css';

interface FormComponentProps {
  onAddItem: (itemValue: string) => void;
}

const FormComponent: React.FC<FormComponentProps> = ({ onAddItem }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onAddItem(inputValue);
    setInputValue(''); // Clear the input after submission
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <input
        type="text"
        className={styles.FormAddElement}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search a location..."
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default FormComponent;
