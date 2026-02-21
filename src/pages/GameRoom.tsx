import { DevicePortalProvider } from '@device-portal/react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './GameRoom.module.css'

export function GameRoom() {
	const { roomCode } = useParams<{ roomCode: string }>()
	const [generatedCode] = useState(() => {
		if (roomCode) {
			return null
		}
		const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
		let result = ''
		for (let i = 0; i < 5; i++) {
			result += chars.charAt(Math.floor(Math.random() * chars.length))
		}
		return result
	})

	const code = roomCode || generatedCode

	if (!code) {
		return null
	}

	if (roomCode) {
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

	return (
		<>
			<DevicePortalProvider room={'spring-hopper-' + code} maxClients={10} value="@TODO" />
			<div className={styles.container}>
				<div className={styles.instructions}>
					<p>To join, go to this URL on another device</p>
					<p>
						and enter code: <strong>{code}</strong>
					</p>
				</div>

				<div className={styles.mainContent}>
					<h1>Game Room Preview</h1>
					<p>
						Room Code: <strong>{code}</strong>
					</p>
					<div className={styles.previewArea}>
						{/* Game preview content will go here */}
						<p>Waiting for players...</p>
					</div>
				</div>
			</div>
		</>
	)
}
