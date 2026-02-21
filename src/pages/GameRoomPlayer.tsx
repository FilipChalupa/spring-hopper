import styles from './GameRoom.module.css'

export function GameRoomPlayer({ roomCode }: { roomCode: string }) {
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
