import React from 'react'
import { ActivityIndicator, View } from 'react-native'

export function Loading() {
	return (
		// Estilização aplicada inline
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: '#181818',
			}}
		>
			{/* ActivityIndicator é um Loader e aplicamos uma cor para ele */}
			<ActivityIndicator color="#fff" />
		</View>
	)
}