// components/ListComponent.tsx

import React from 'react';
import styles from './ListComponent.module.css';

interface ListItem {
  id: number;
  value: string;
}

interface ListComponentProps {
  items: ListItem[];
  onRemoveItem: (itemId: number) => void; // Add this line
}

const ListComponent: React.FC<ListComponentProps> = ({ items, onRemoveItem }) => {
  return (
    <ul className={styles.listContainer}>
      {items.map((item) => (
        <li key={item.id} className={styles.listItem}>
          {item.value}
          <button id="text-btn" onClick={() => onRemoveItem(item.id)} style={{ marginLeft: '10px' }}>Remove</button>
        </li>
      ))}
    </ul>
  );
};

export default ListComponent;
