import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useReducer, useEffect, useRef } from 'react'


const initialState = {
  isRunning: false,
  time: 0,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'START':
      return { ...state, isRunning: true }
    case 'STOP':
      return { ...state, isRunning: false }
    case 'RESET':
      return { ...initialState }
    case 'TICK':
      return { ...state, time: state.time + 1 }
    default:
      console.error('Invalid action type:', action.type)
      throw new Error()
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const timerId = useRef(null)

  useEffect(() => {
    if (!state.isRunning) {
      return
    }

    timerId.current = setInterval(() => dispatch({ type: 'TICK' }), 1000)
    return () => { 
      clearInterval(timerId.current)
      timerId.current = null
    }
  }, [state.isRunning])

  const FormattedTime = () => {
    const secondsInt = parseInt(state.time, 10)
    const hours = String(Math.floor(secondsInt / 3600))
    const minutes = String(Math.floor((secondsInt % 3600) / 60))
    const seconds = String(secondsInt % 60)

    return <Text styles={styles.time}>{`${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`}</Text>
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <FormattedTime />
      <View style={styles.buttons}>
        <Button style={styles.button} title="Start" onPress={() => dispatch({ type: 'START' })} />
        <Button style={styles.button} title="Stop" onPress={() => dispatch({ type: 'STOP' })} />
        <Button style={styles.button} title="Reset" onPress={() => dispatch({ type: 'RESET' })} />
      </View>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
})
