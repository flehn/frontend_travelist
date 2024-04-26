// CreateListButton.js
import React from 'react';
import { API_ENDPOINTS } from '../../../../../../../Alt_NextJS/nextjs_travelist/apiConfig';
import Cookies from "js-cookie";

interface ListItem {
  id: number;
  value: string;
}

interface CreateListButtonProps {
  listName: string;
  items: ListItem[];
  isPublic: boolean;
  onMessage: (message: { type: 'error' | 'success', messages: string[] }) => void;
  onReset: () => void; // Add this line to declare the onReset prop
}


const CreateListButton: React.FC<CreateListButtonProps> = ({ listName, items, isPublic, onMessage, onReset }) => {
  const handleSubmit = async () => {
    const payload = {
      list_name: listName,
      is_public: isPublic,
      elements: items.map(item => ({ name: item.value })),
    };
    const token = Cookies.get('accessToken');
    try {
      const response = await fetch(API_ENDPOINTS.create_list, {
        method: 'POST',
        mode: 'cors',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorsList = data.errors ? Object.values(data.errors).flat().map(String) : ['An unexpected error occurred'];
        onMessage({ type: 'error', messages: errorsList });
      } else {
        onMessage({ type: 'success', messages: [data.message || 'List created successfully'] });
        onReset(); // Reset the parent component's state
      }
    } catch (error) {
      console.error("Failed to create list", error);
      onMessage({ type: 'error', messages: ["Network error. Please try again later."] });
    }
  };

  const isButtonDisabled = !listName.trim() || items.length === 0;

  return (
    <button onClick={handleSubmit} disabled={isButtonDisabled}>
      Create List
    </button>
  );
};

export default CreateListButton;
