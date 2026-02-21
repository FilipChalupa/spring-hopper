import { type FunctionComponent, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const JoinGame: FunctionComponent = () => {
	const [code, setCode] = useState('')
	const navigate = useNavigate()

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault()
		if (code) {
			navigate(`/room/${code}`)
		}
	}

	return (
		<div>
			<h1>Join Game</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<input
						type="text"
						placeholder="Enter game code"
						value={code}
						onChange={(event) => setCode(event.target.value)}
						autoFocus
					/>
				</div>
				<div style={{ marginTop: '1rem' }}>
					<button type="submit" disabled={!code}>
						Join
					</button>
					<Link to="/" className="button" style={{ marginLeft: '0.5rem' }}>
						Back
					</Link>
				</div>
			</form>
		</div>
	)
}
