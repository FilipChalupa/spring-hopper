import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './GameRoom.module.css';

export function GameRoom() {
  const location = useLocation();
  const navigate = useNavigate();
  const code = location.state?.code;

  useEffect(() => {
    if (!code) {
      navigate('/new');
    }
  }, [code, navigate]);

  if (!code) return null;

  return (
    <div className={styles.container}>
      <div className={styles.instructions}>
        <p>To join, go to this URL on another device</p>
        <p>and enter code: <strong>{code}</strong></p>
      </div>
      
      <div className={styles.mainContent}>
        <h1>Game Room Preview</h1>
        <p>Room Code: <strong>{code}</strong></p>
        <div className={styles.previewArea}>
          {/* Game preview content will go here */}
          <p>Waiting for players...</p>
        </div>
      </div>
    </div>
  );
}
