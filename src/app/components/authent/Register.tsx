// components/auth/SignUpForm.tsx
"use client"

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { z } from 'zod';
import { useRouter } from 'next/navigation'
import { API_ENDPOINTS } from '../../../../../../Alt_NextJS/nextjs_travelist/apiConfig';
import styles from './AuthComponent.module.css';  


  

// Zod schema for form validation
const FormData = z.object({
  UserName: z.string().min(3).max(12),
  email: z.string().email(),
  password: z.string().min(8), // Assuming you still want password validation
});

interface SignUpFormProps {
  onSwitch: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSwitch }) => {
  const [userInfo, setUserInfo] = useState({
    UserName: '',
    email: '',
    password: '',
    password2: '',
  });
 
  const [formMessages, setFormMessages] = useState<{ type: 'error' | 'success', messages: string[] }>({
    type: 'error',
    messages: [],
  });

  const router = useRouter()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const validateFormData = (inputs: typeof userInfo) => {
    try {
      FormData.parse(inputs);
      return true; // Data is valid
    } catch (error) {
      if (error instanceof z.ZodError) {
        // This ensures TypeScript knows 'error' is of type ZodError, resolving the error
        return error.errors.map(err => `${err.path[0]}: ${err.message}`);
      }
      // If the error is not a ZodError, you might still want to handle it differently
      // For now, let's just log it to the console or handle it as you see fit
      console.error("An unexpected error occurred:", error);
      return ["An unexpected error occurred. Please try again."];
    }
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();
    const validationResults = validateFormData(userInfo);

    if (validationResults === true) {
      setFormMessages({ type: 'error', messages: [] });
      try {
        const response = await fetch(API_ENDPOINTS.register, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: userInfo.UserName,
            email: userInfo.email,
            password: userInfo.password,
            password2: userInfo.password2,
          }),
        });
        
        const data = await response.json();
        

        if (!response.ok) {
          // Server responded with error messages
          const errorsList = Object.values(data).flat().map(String);
          setFormMessages({ type: 'error', messages: errorsList });
        } else {
          // Server responded with success, handle according to your app logic
          setFormMessages({ type: 'success', messages: [data.message || 'Signup successful.'] });
          // Here you can also redirect the user or perform other success actions
          // Redirect to the homepage
          router.push('/auth/login')
        }
      } catch (error) {
        console.error("An error occurred while signing up:", error);
        setFormMessages({ type: 'error', messages: ["An unexpected error occurred during sign up. Please try again."] });
      }
    } else {
      setFormMessages({ type: 'error', messages: validationResults });
    }
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formField}>
        <input
          type="text"
          name="UserName"
          value={userInfo.UserName}
          onChange={handleChange}
          placeholder="User Name"
        />
        </div>

        <div className={styles.formField}>
        <input
          type="email"
          name="email"
          value={userInfo.email}
          onChange={handleChange}
          placeholder="Email"
        />
        </div>

        <div className={styles.formField}>
        <input
          type="password"
          name="password"
          value={userInfo.password}
          onChange={handleChange}
          placeholder="Password"
        />
        </div>

        <div className={styles.formField}>
        <input
          type="password"
          name="password2"
          value={userInfo.password2}
          onChange={handleChange}
          placeholder="Repeat Password"
        />
        </div>

        {/* Submit button */}
        <button type="submit" className={styles.button}>Sign Up</button>
      </form>
        {/* Message display */}
        {formMessages.messages.length > 0 && (
        <div className={formMessages.type === 'error' ? styles.errorMessage : styles.successMessage}>
            {formMessages.messages.map((message, index) => (
            <div key={index}>{message}</div>
            ))}
        </div>
        )}
      <button onClick={onSwitch} id="text-btn" style={{ margin: '15px' }}>Already have an account? Log In</button>
    </div>
  );
};

export default SignUpForm;
