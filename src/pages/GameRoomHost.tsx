import { Initiator } from '@device-portal/client'
import { useDevicePortalPeer, useDevicePortalProvider, type PeerId } from '@device-portal/react'
import { QRCodeSVG } from 'qrcode.react'
import { useState, type FunctionComponent } from 'react'
import { fullRoomCode } from '../utilities/fullRoomCode'
import styles from './GameRoomHost.module.css'

const Player: FunctionComponent<{
	initiator: Initiator
	peerId: PeerId
	onMessage: (message: string) => void
}> = ({ initiator, peerId, onMessage }) => {
	useDevicePortalPeer(initiator, peerId, {
		value: '@TODO',
		onMessageFromConsumer: onMessage,
	})

	return null
}

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

	const [playerPositions, setPlayerPositions] = useState<
		Record<string, { x: number; y: number; angle: number; color: string }>
	>({})

	const { peers, initiator } = useDevicePortalProvider(fullRoomCode(code), {
		maxClients: 10,
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

	const handleMessage = (peerId: string, message: string) => {
		const { leftPower, rightPower } = JSON.parse(message) as {
			leftPower: number
			rightPower: number
		}
		setPlayerPositions((previous) => {
			const current = previous[peerId] ?? {
				x: 0,
				y: 0,
				angle: 0,
				color: `hsl(${Math.random() * 360}, 70%, 60%)`,
			}
			const rotationDelta = (leftPower - rightPower) * 100
			const newAngle = current.angle + rotationDelta
			const jumpDistance = (leftPower + rightPower) * 50
			const rad = (newAngle * Math.PI) / 180

			const dx = Math.sin(rad) * jumpDistance
			const dy = -Math.cos(rad) * jumpDistance

			return {
				...previous,
				[peerId]: {
					...current,
					x: current.x + dx,
					y: current.y + dy,
					angle: newAngle,
				},
			}
		})
	}

	return (
		<>
			{initiator &&
				peers.map((peerId) => (
					<Player
						key={peerId}
						initiator={initiator}
						peerId={peerId}
						onMessage={(message) => handleMessage(peerId, message)}
					/>
				))}
			<div className={styles.container}>
				<div className={styles.instructions}>
					<button className={styles.qrCode} onClick={handleShare}>
						<QRCodeSVG
							size={128}
							style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
							value={joinUrl}
						/>
					</button>
					<p>
						Code to join: <strong>{code}</strong>
					</p>
				</div>

				<div className={styles.mainContent}>
					{peers.length > 0 ? (
						<div className={styles.gameWorld}>
							{peers.map((peerId) => {
								const position = playerPositions[peerId] ?? {
									x: 0,
									y: 0,
									angle: 0,
									color: '#646cff',
								}
								return (
									<div
										key={peerId}
										className={styles.player}
										style={{
											transform: `translate(${position.x}px, ${position.y}px) rotate(${position.angle}deg)`,
											backgroundColor: position.color,
										}}
									>
										<div
											className={styles.leg}
											style={{
												top: '5px',
												left: '-8px',
												transform: 'rotate(-30deg)',
											}}
										/>
										<div
											className={styles.leg}
											style={{
												top: '15px',
												left: '-10px',
												transform: 'rotate(-10deg)',
											}}
										/>
										<div
											className={styles.leg}
											style={{
												top: '25px',
												left: '-8px',
												transform: 'rotate(20deg)',
											}}
										/>
										<div
											className={styles.leg}
											style={{
												top: '5px',
												right: '-8px',
												transform: 'rotate(30deg)',
											}}
										/>
										<div
											className={styles.leg}
											style={{
												top: '15px',
												right: '-10px',
												transform: 'rotate(10deg)',
											}}
										/>
										<div
											className={styles.leg}
											style={{
												top: '25px',
												right: '-8px',
												transform: 'rotate(-20deg)',
											}}
										/>
									</div>
								)
							})}
						</div>
					) : (
						<div className={styles.previewArea}>
							<p>Waiting for players…</p>
						</div>
					)}
				</div>
			</div>
		</>
	)
}
