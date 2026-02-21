import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export function JoinGame() {
	const [code, setCode] = useState('')
	const navigate = useNavigate()

	const handleJoin = () => {
		if (code) {
			navigate(`/room/${code}`)
		}
	}

	return (
		<div>
			<h1>Join Game</h1>
			<div>
				<input
					type="text"
					placeholder="Enter game code"
					value={code}
					onChange={(e) => setCode(e.target.value)}
				/>
			</div>
			<div style={{ marginTop: '1rem' }}>
				<button disabled={!code} onClick={handleJoin}>
					Join
				</button>
				<Link to="/" className="button" style={{ marginLeft: '0.5rem' }}>
					Back
				</Link>
			</div>
		</div>
	)
}
