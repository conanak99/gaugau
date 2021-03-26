import * as React from 'react'

import * as Notifications from 'expo-notifications'
import styled from 'styled-components'
import { Text, View } from 'react-native'
import { Button, Header } from 'react-native-elements'
import { submitToken, Token } from '../services/api'

const Page = styled(View)`
  padding: 40px 30px 0 30px;
`
const Heading = styled(Text)`
  text-align: center;
  font-size: 20px;
  margin-bottom: 16px;
  font-weight: bold;
`

async function registerForPushNotificationsAsync() {
  const { status } = await Notifications.getPermissionsAsync()
  if (status !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync()
    if (status !== 'granted') {
      alert('Failed to get push token for push notification!')
      return
    }
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data
  console.log(token)
  return token
}

const BoyScreen: React.FC = () => {
  const [token, setToken] = React.useState<Token | undefined>()

  React.useEffect(() => {
    // registerForPushNotificationsAsync().then(token => setExpoPushToken(token))

    const subA = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification)
    })

    const subB = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response)
    })

    return () => {
      Notifications.removeNotificationSubscription(subA)
      Notifications.removeNotificationSubscription(subB)
    }
  }, [])

  return (
    <>
      <Header centerComponent={{ text: 'Cho bạn nam 👦', style: { color: '#fff' } }} />

      <Page>
        <Heading>
          {token ? `Mã số của bạn là ${token.id}.` : 'Bạn chưa có mã số. Bấm để lấy mã!'}
        </Heading>
        <Button
          title="Bấm để lấy mã số"
          onPress={async () => {
            const pushToken = await registerForPushNotificationsAsync()
            if (pushToken) {
              const storedToken = await submitToken(pushToken)
              setToken(storedToken)
            }
          }}
        />
      </Page>
    </>
  )
}

export default BoyScreen
