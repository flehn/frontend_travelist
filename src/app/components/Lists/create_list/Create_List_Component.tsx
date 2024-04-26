"use client"
import React, { useState } from 'react';
import ListTitleInput from './ListTitelInput';
import CreateListButton from './CreateListButton';
import FormComponent from './FormAddElement';
import ListComponent from './list_component';
import PublicPrivateToggle from './PublicPrivateToggle';
import styles from './ParentComponent.module.css';

interface ListItem {
  id: number;
  value: string;
}

const CreateListComponent: React.FC = () => {
  const [listName, setListName] = useState('');
  const [items, setItems] = useState<ListItem[]>([]);
  const [isPublic, setIsPublic] = useState(true);
  const [formMessages, setFormMessages] = useState<{ type: 'error' | 'success', messages: string[] }>({ type: 'error', messages: [] });

  const handleAddItem = (itemValue: string) => {
    const newItem = { id: Date.now(), value: itemValue };
    setItems(prevItems => [...prevItems, newItem]);
  };

  const handleRemoveItem = (itemId: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const handleReset = () => {
    setListName('');
    setItems([]);
    setIsPublic(true);  
    setFormMessages({ type: 'success', messages: [] });  // Using 'success' with an empty messages array
};

  return (
    <div className={styles.card}>
      <h1>Create new List</h1>
      <ListTitleInput value={listName} onChange={setListName} />
      <FormComponent onAddItem={handleAddItem} />
      <ListComponent items={items} onRemoveItem={handleRemoveItem} />
      <div className={styles.actions}>
        <PublicPrivateToggle isPublic={isPublic} onToggle={setIsPublic} />
        <CreateListButton
          listName={listName}
          items={items}
          isPublic={isPublic}
          onMessage={setFormMessages}
          onReset={handleReset}
        />
      </div>
      {/* Message display area below actions */}
      {formMessages.messages.length > 0 && (
        <div className={formMessages.type === 'error' ? 'errorMessage' : 'successMessage'}>
          {formMessages.messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreateListComponent;
