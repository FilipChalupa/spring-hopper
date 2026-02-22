import { useEffect, type FunctionComponent } from 'react'
import { useChromecastCafReceiver } from 'react-chromecast-caf'
import { GameRoom } from './GameRoom'

export const CastReceiver: FunctionComponent = () => {
	const { cast } = useChromecastCafReceiver()

	useEffect(() => {
		if (cast === null) {
			return
		}
		const context = cast.framework.CastReceiverContext.getInstance()
		if (context === null) {
			return
		}
		const options = new cast.framework.CastReceiverOptions()
		options.disableIdleTimeout = true
		context.start(options)
	}, [cast])

	return <GameRoom />
}
