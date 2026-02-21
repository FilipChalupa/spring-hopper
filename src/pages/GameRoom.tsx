import { type FunctionComponent } from 'react'
import { useParams } from 'react-router-dom'
import { GameRoomHost } from './GameRoomHost'
import { GameRoomPlayer } from './GameRoomPlayer'

export const GameRoom: FunctionComponent = () => {
	const { roomCode } = useParams<{ roomCode: string }>()

	if (roomCode) {
		return <GameRoomPlayer roomCode={roomCode} />
	}

	return <GameRoomHost />
}
