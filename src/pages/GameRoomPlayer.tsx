import { type FunctionComponent, useCallback, useState } from 'react'
import { useDrag } from 'react-use-drag'
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

export const GameRoomPlayer: FunctionComponent<GameRoomPlayerProps> = ({ roomCode }) => {
	const [pullLeft, setPullLeft] = useState(0)
	const [pullRight, setPullRight] = useState(0)

	const onRelativePositionChangeLeft = useCallback((_x: number, y: number) => {
		setPullLeft(Math.min(MAX_PULL, Math.max(0, y)))
	}, [])

	const onRelativePositionChangeRight = useCallback((_x: number, y: number) => {
		setPullRight(Math.min(MAX_PULL, Math.max(0, y)))
	}, [])

	const onEndLeft = useCallback(() => {
		setPullLeft(0)
	}, [])

	const onEndRight = useCallback(() => {
		setPullRight(0)
	}, [])

	const { elementProps: dragPropsLeft } = useDrag({
		onRelativePositionChange: onRelativePositionChangeLeft,
		onEnd: onEndLeft,
	})

	const { elementProps: dragPropsRight } = useDrag({
		onRelativePositionChange: onRelativePositionChangeRight,
		onEnd: onEndRight,
	})

	return (
		<div className={styles.container}>
			<h1>Game Room</h1>
			<p>
				Joined room: <strong>{roomCode}</strong>
			</p>

			<div className={styles.controls}>
				<div className={styles.sliderContainer}>
					<label>Left Leg</label>
					<div className={styles.sliderTrack}>
						<div
							className={styles.sliderFill}
							style={{
								height: `${pullLeft + HANDLE_HEIGHT / 2}px`,
								backgroundColor: getFillColor(pullLeft),
							}}
						/>
						<div
							className={styles.sliderHandle}
							style={{ top: `${pullLeft}px`, backgroundColor: getFillColor(pullLeft) }}
							{...dragPropsLeft}
						>
							{Math.round((pullLeft / MAX_PULL) * 100)}%
						</div>
					</div>
				</div>

				<div className={styles.sliderContainer}>
					<label>Right Leg</label>
					<div className={styles.sliderTrack}>
						<div
							className={styles.sliderFill}
							style={{
								height: `${pullRight + HANDLE_HEIGHT / 2}px`,
								backgroundColor: getFillColor(pullRight),
							}}
						/>
						<div
							className={styles.sliderHandle}
							style={{ top: `${pullRight}px`, backgroundColor: getFillColor(pullRight) }}
							{...dragPropsRight}
						>
							{Math.round((pullRight / MAX_PULL) * 100)}%
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
