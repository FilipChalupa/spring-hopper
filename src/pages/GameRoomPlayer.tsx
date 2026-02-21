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

interface LegSliderProps {
	label: string
}

const LegSlider: FunctionComponent<LegSliderProps> = ({ label }) => {
	const [pull, setPull] = useState(0)

	const onRelativePositionChange = useCallback((_x: number, y: number) => {
		setPull(Math.min(MAX_PULL, Math.max(0, y)))
	}, [])

	const onEnd = useCallback(() => {
		setPull(0)
	}, [])

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

export const GameRoomPlayer: FunctionComponent<GameRoomPlayerProps> = ({ roomCode }) => {
	return (
		<div className={styles.container}>
			<h1>Game Room</h1>
			<p>
				Joined room: <strong>{roomCode}</strong>
			</p>

			<div className={styles.controls}>
				<LegSlider label="Left Leg" />
				<LegSlider label="Right Leg" />
			</div>
		</div>
	)
}
