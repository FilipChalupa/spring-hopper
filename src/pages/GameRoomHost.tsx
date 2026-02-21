import { DevicePortalProvider } from '@device-portal/react'
import { type FunctionComponent, useState } from 'react'
import { fullRoomCode } from '../utilities/fullRoomCode'
import styles from './GameRoomHost.module.css'

export const GameRoomHost: FunctionComponent = () => {
	const [code] = useState<string>(() => {
		const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
		let result = ''
		for (let i = 0; i < 5; i++) {
			result += chars.charAt(Math.floor(Math.random() * chars.length))
		}
		return result
	})

	return (
		<>
			<DevicePortalProvider room={fullRoomCode(code)} maxClients={10}>
				{(Peer, peerId) => (
					<>
						<Peer
							value="@TODO"
							onMessageFromConsumer={(message) => {
								const { leftPower, rightPower } = JSON.parse(message) as {
									leftPower: number
									rightPower: number
								}
								console.log({ leftPower, rightPower })
							}}
						/>
						{peerId}
					</>
				)}
			</DevicePortalProvider>
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
