import { type FunctionComponent, useState, useCallback } from 'react'
import { useDrag } from 'react-use-drag'
import styles from './GameRoom.module.css'

interface GameRoomPlayerProps {
	roomCode: string
}

const TRACK_HEIGHT = 200
const HANDLE_HEIGHT = 40
const MAX_PULL = TRACK_HEIGHT - HANDLE_HEIGHT

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
							style={{ height: `${TRACK_HEIGHT - (pullLeft + HANDLE_HEIGHT)}px` }}
						/>
						<div
							className={styles.sliderHandle}
							style={{ top: `${pullLeft}px` }}
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
							style={{ height: `${TRACK_HEIGHT - (pullRight + HANDLE_HEIGHT)}px` }}
						/>
						<div
							className={styles.sliderHandle}
							style={{ top: `${pullRight}px` }}
							{...dragPropsRight}
						>
							{Math.round((pullRight / MAX_PULL) * 100)}%
						</div>
					</div>
				</div>
			</div>

			<div className={styles.previewArea}>
				<p>Pull the sliders to load legs!</p>
			</div>
		</div>
	)
}
