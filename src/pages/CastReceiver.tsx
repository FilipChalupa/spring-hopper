import { useEffect, type FunctionComponent } from 'react'
import { useChromecastReceiver } from 'use-chromecast-caf-receiver'
import { GameRoom } from './GameRoom'

export const CastReceiver: FunctionComponent = () => {
	const { cast } = useChromecastReceiver()

	useEffect(() => {
		if (cast === null) {
			return
		}
		// @ts-expect-error Something wrong in typings. @TODO: Fix later.
		const context = cast.framework.CastReceiverContext.getInstance()
		if (context === null) {
			return
		}
		// @ts-expect-error Something wrong in typings. @TODO: Fix later.
		const options = new cast.framework.CastReceiverOptions()
		options.disableIdleTimeout = true
		context.start(options)
	}, [cast])

	return <GameRoom />
}
