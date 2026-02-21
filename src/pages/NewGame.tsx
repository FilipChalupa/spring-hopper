import { Link } from 'react-router-dom';

export function NewGame() {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>Host New Game</h1>
      <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
        <p><strong>Note:</strong> This device will act as the game server.</p>
        <p>To play, you will need to:</p>
        <ol>
          <li>Host the game on this screen.</li>
          <li>Join from another device (phone or tablet) as a player using the room code.</li>
        </ol>
      </div>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Link to="/room" className="button">Start Game</Link>
        <Link to="/" className="button">Back</Link>
      </div>
    </div>
  );
}
