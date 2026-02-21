import { useState } from 'react'
import { DevicePortalProvider } from '@device-portal/react'
import styles from './GameRoom.module.css'

export function GameRoom() {
	const [code] = useState<string>(() => {
		const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
		let result = ''
		for (let i = 0; i < 5; i++) {
			result += chars.charAt(Math.floor(Math.random() * chars.length))
		}
		return result
	})

	if (!code) return null

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
