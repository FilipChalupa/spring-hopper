import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1>Spring Hopper</h1>
      <div className={styles.buttonGroup}>
        <button onClick={() => navigate('/new')}>New Game</button>
        <button onClick={() => navigate('/join')}>Join Game</button>
      </div>
    </div>
  );
}
