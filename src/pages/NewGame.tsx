import { useNavigate } from 'react-router-dom';

export function NewGame() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/room');
  };

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
        <button onClick={handleStart}>Start Game</button>
        <button onClick={() => navigate('/')}>Back</button>
      </div>
    </div>
  );
}
