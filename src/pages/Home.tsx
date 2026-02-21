import { Link } from 'react-router-dom';
import styles from './Home.module.css';

export function Home() {
  return (
    <div className={styles.container}>
      <h1>Spring Hopper</h1>
      <div className={styles.buttonGroup}>
        <Link to="/new" className="button">New Game</Link>
        <Link to="/join" className="button">Join Game</Link>
      </div>
    </div>
  );
}
