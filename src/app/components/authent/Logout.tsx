// components/LogoutComponent.js
import React from 'react';
import { useRouter } from 'next/navigation'; // Updated import for useRouter
import { Button } from '@nextui-org/react';
import { API_ENDPOINTS } from '../../../../../../Alt_NextJS/nextjs_travelist/apiConfig'; // Ensure this path is correct

const LogoutComponent = () => {
  const router = useRouter(); // Use useRouter from next/navigation

  const handleLogout = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.logout, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Optionally include other headers like authorization if needed
        },
        credentials: 'include', // Ensure credentials are handled as per your auth setup
      });

      if (response.ok) {
        // Optionally clear local storage, cookies, or other session data here
        router.push('/login'); // Redirect to the login page after successful logout
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <Button onClick={handleLogout}>
      Log Out
    </Button>
  );
};

export default LogoutComponent;
