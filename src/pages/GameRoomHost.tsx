import { DevicePortalProvider } from '@device-portal/react'
import { type FunctionComponent, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { fullRoomCode } from '../utilities/fullRoomCode'
import styles from './GameRoomHost.module.css'

export const GameRoomHost: FunctionComponent = () => {
	const [code] = useState<string>(() => {
		if (import.meta.env.DEV) {
			return 'LOCAL'
		}
		const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
		let result = ''
		for (let i = 0; i < 5; i++) {
			result += chars.charAt(Math.floor(Math.random() * chars.length))
		}
		return result
	})

	const joinUrl = window.location.origin + window.location.pathname + '#/room/' + code

	const handleShare = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: 'Join Spring Hopper',
					text: `Join my game room with code: ${code}`,
					url: joinUrl,
				})
			} catch (error) {
				console.error('Error sharing:', error)
			}
		} else {
			// Fallback: Copy to clipboard? Or just do nothing if not supported.
			console.log('Web Share API not supported')
		}
	}

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
					<button className={styles.qrCode} onClick={handleShare}>
						<QRCodeSVG
							size={128}
							style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
							value={joinUrl}
						/>
					</button>
					<p>To join, go to this URL on another device</p>
					<p>
						and enter code: <strong>{code}</strong>
					</p>
				</div>

				<div className={styles.mainContent}>
					<div className={styles.previewArea}>
						<p>Waiting for players…</p>
					</div>
				</div>
			</div>
		</>
	)
}
