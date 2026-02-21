import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { NewGame } from './pages/NewGame';
import { JoinGame } from './pages/JoinGame';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<NewGame />} />
        <Route path="/join" element={<JoinGame />} />
      </Routes>
    </Router>
  );
}

export default App;
