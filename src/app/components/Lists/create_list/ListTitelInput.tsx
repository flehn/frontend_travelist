// components/ListTitelInput.tsx

import React from 'react';
import styles from './ListTitleInput.module.css';

interface TextInputFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const ListTitelInput: React.FC<TextInputFieldProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className={styles.listName}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter list name"
    />
  );
};

export default ListTitelInput;