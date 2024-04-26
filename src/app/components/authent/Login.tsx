// components/auth/LoginForm.tsx
"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import styles from './AuthComponent.module.css'; 

// Zod schema for login form validation
const FormData = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

interface LoginFormProps {
  onSwitchToSignUp: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToSignUp }) => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [formMessages, setFormMessages] = useState<{ type: 'error' | 'success', messages: string[] }>({
    type: 'error',
    messages: [],
  });

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const validateFormData = (inputs: typeof loginInfo) => {
    try {
      FormData.parse(inputs);
      return true; // Data is valid
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors.map(err => `${err.path[0]}: ${err.message}`);
      }
      console.error("An unexpected error occurred:", error);
      return ["An unexpected error occurred. Please try again."];
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationResults = validateFormData(loginInfo);

    if (validationResults === true) {
      try {
        const response = await fetch('/api/GetAccessToken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginInfo),
        });
        const data = await response.json(); // Parse the JSON from the response

        if (response.ok) {
          setFormMessages({ type: 'success', messages: [data.message || 'Login successful.'] });
          router.push('/');
        } else {
          setFormMessages({ type: 'error', messages: [data.error || 'Failed to log in.'] });
        }
      } catch (error) {
        console.error('An error occurred:', error);
        setFormMessages({ type: 'error', messages: ['Network error. Please try again.'] });
      }
    } else {
      setFormMessages({ type: 'error', messages: validationResults });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formField}>
          <input
            type="email"
            id="email"
            name="email"
            value={loginInfo.email}
            onChange={handleChange}
            placeholder="Email"
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formField}>
          <input
            type="password"
            id="password"
            name="password"
            value={loginInfo.password}
            onChange={handleChange}
            placeholder="Password"
            className={styles.input}
            required
          />
        </div>

        <button type="submit" className={styles.button}>Log In</button>
      </form>
      {formMessages.messages.length > 0 && (
        <div className={formMessages.type === 'error' ? styles.errorMessage : styles.successMessage}>
          {formMessages.messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
      )}
      <button onClick={onSwitchToSignUp} id="text-btn" style={{ margin: '15px' }}>Don't have an account? Sign Up</button>
    </>  
  );
};

export default LoginForm;
