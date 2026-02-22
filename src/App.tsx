import { type FunctionComponent } from 'react'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { CastReceiver } from './pages/CastReceiver'
import { GameRoom } from './pages/GameRoom'
import { Home } from './pages/Home'
import { JoinGame } from './pages/JoinGame'
import { NewGame } from './pages/NewGame'

const App: FunctionComponent = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/new" element={<NewGame />} />
				<Route path="/join" element={<JoinGame />} />
				<Route path="/room" element={<GameRoom />} />
				<Route path="/cast" element={<CastReceiver />} />
				<Route path="/room/:roomCode" element={<GameRoom />} />
			</Routes>
		</Router>
	)
}

export default App
