import { type FunctionComponent } from 'react'
import styles from './GameRoom.module.css'

interface GameRoomPlayerProps {
	roomCode: string
}

export const GameRoomPlayer: FunctionComponent<GameRoomPlayerProps> = ({ roomCode }) => {
	return (
		<div className={styles.container}>
			<h1>Game Room</h1>
			<p>
				Joined room: <strong>{roomCode}</strong>
			</p>
			<div className={styles.previewArea}>
				<p>Controls will be implemented here soon.</p>
			</div>
		</div>
	)
}
