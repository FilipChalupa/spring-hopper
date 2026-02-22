import { DevicePortalConsumer } from '@device-portal/react'
import { type FunctionComponent, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDrag } from 'react-use-drag'
import { fullRoomCode } from '../utilities/fullRoomCode'
import styles from './GameRoomPlayer.module.css'

interface GameRoomPlayerProps {
	roomCode: string
}

const TRACK_HEIGHT = 200
const HANDLE_HEIGHT = 44
const MAX_PULL = TRACK_HEIGHT - HANDLE_HEIGHT

const getFillColor = (pull: number) => {
	const percentage = pull / MAX_PULL
	// Transition from blue (100, 108, 255) to red (255, 64, 64)
	const r = Math.round(100 + (255 - 100) * percentage)
	const g = Math.round(108 + (64 - 108) * percentage)
	const b = Math.round(255 + (64 - 255) * percentage)
	return `rgb(${r}, ${g}, ${b})`
}

interface LegSliderProps {
	label: string
	onRelease: (power: number) => void
}

const LegSlider: FunctionComponent<LegSliderProps> = ({ label, onRelease }) => {
	const [pull, setPull] = useState(0)

	const onRelativePositionChange = useCallback((_x: number, y: number) => {
		setPull(Math.min(MAX_PULL, Math.max(0, y)))
	}, [])

	const onEnd = useCallback(
		(_x: number, y: number) => {
			const power = Math.min(1, Math.max(0, y / MAX_PULL))
			onRelease(power)
			setPull(0)
		},
		[onRelease],
	)

	const { elementProps } = useDrag({
		onRelativePositionChange,
		onEnd,
	})

	const fillColor = getFillColor(pull)

	return (
		<div className={styles.sliderContainer}>
			<label>{label}</label>
			<div className={styles.sliderTrack}>
				<div
					className={styles.sliderFill}
					style={{
						height: `${pull + HANDLE_HEIGHT / 2}px`,
						backgroundColor: fillColor,
					}}
				/>
				<div
					className={styles.sliderHandle}
					style={{ top: `${pull}px`, backgroundColor: fillColor }}
					{...elementProps}
				>
					{Math.round((pull / MAX_PULL) * 100)}%
				</div>
			</div>
		</div>
	)
}

interface GameRoomPlayerConnectedProps {
	roomCode: string
	onJump: (leftPower: number | undefined, rightPower: number | undefined) => void
}

const GameRoomPlayerConnected: FunctionComponent<GameRoomPlayerConnectedProps> = ({
	roomCode,
	onJump,
}) => {
	const pendingRelease = useRef<{ left?: number; right?: number; timer?: number }>({})

	useEffect(() => {
		const originalStyle = document.body.style.overscrollBehavior
		document.body.style.overscrollBehavior = 'none'
		return () => {
			document.body.style.overscrollBehavior = originalStyle
		}
	}, [])

	const handleRelease = useCallback(
		(side: 'left' | 'right', power: number) => {
			const data = pendingRelease.current
			data[side] = power

			if (data.left !== undefined && data.right !== undefined) {
				if (data.timer) {
					window.clearTimeout(data.timer)
				}
				onJump(data.left, data.right)
				pendingRelease.current = {}
				return
			}

			if (!data.timer) {
				data.timer = window.setTimeout(() => {
					const finalLeft = pendingRelease.current.left
					const finalRight = pendingRelease.current.right
					onJump(finalLeft, finalRight)
					pendingRelease.current = {}
				}, 300)
			}
		},
		[onJump],
	)

	return (
		<>
			<h1>Game Room</h1>
			<p>
				Joined room: <strong>{roomCode}</strong>
			</p>

			<div className={styles.controls}>
				<LegSlider label="Left Leg" onRelease={(power) => handleRelease('left', power)} />
				<LegSlider label="Right Leg" onRelease={(power) => handleRelease('right', power)} />
			</div>
		</>
	)
}

export const GameRoomPlayer: FunctionComponent<GameRoomPlayerProps> = ({ roomCode }) => {
	return (
		<div className={styles.container}>
			<Suspense
				fallback={
					<div>
						<p>
							Connecting to room <strong>{roomCode}</strong>…
						</p>
						<Link to="/join" className="button">
							Back
						</Link>
					</div>
				}
			>
				<DevicePortalConsumer room={fullRoomCode(roomCode)}>
					{({ sendMessageToProvider }) => (
						<GameRoomPlayerConnected
							roomCode={roomCode}
							onJump={(leftPower, rightPower) => {
								const messagePayload: { leftPower?: number; rightPower?: number } = {}
								if (leftPower !== undefined) {
									messagePayload.leftPower = leftPower
								}
								if (rightPower !== undefined) {
									messagePayload.rightPower = rightPower
								}
								sendMessageToProvider(JSON.stringify(messagePayload))
							}}
						/>
					)}
				</DevicePortalConsumer>
			</Suspense>
		</div>
	)
}
