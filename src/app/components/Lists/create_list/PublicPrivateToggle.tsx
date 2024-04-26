// components/PublicPrivateToggle.tsx
import React, { useState } from 'react';
import styles from './PublicPrivate.module.css'; // Adjust the path as needed

interface PublicPrivateToggleProps {
  isPublic: boolean;
  onToggle: (value: boolean) => void;
}

const PublicPrivateToggle: React.FC<PublicPrivateToggleProps> = ({ isPublic, onToggle }) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}> {/* Wrapper to align items horizontally */}
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={() => onToggle(!isPublic)}
            className={styles.toggleSwitch}
          />
          <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
        <span className={styles.toggleLabel}>{isPublic ? 'Public' : 'Private'}</span> {/* Label text outside */}
      </div>
    );
  };
  

export default PublicPrivateToggle;
