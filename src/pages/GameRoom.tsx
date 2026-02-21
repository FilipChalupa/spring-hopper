import { useParams } from 'react-router-dom';
import styles from './GameRoom.module.css';

export function GameRoom() {
  const { code } = useParams<{ code: string }>();

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
