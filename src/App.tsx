import { type FunctionComponent } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { NewGame } from './pages/NewGame'
import { JoinGame } from './pages/JoinGame'
import { GameRoom } from './pages/GameRoom'

const App: FunctionComponent = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/new" element={<NewGame />} />
				<Route path="/join" element={<JoinGame />} />
				<Route path="/room" element={<GameRoom />} />
				<Route path="/room/:roomCode" element={<GameRoom />} />
			</Routes>
		</Router>
	)
}

export default App
