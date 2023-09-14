import axios from 'axios'

const EXPO_SERVER_URL = 'https://api.expo.dev/v2/push/send'

const TOKEN_SERVER_URL = 'https://gau-server.glitch.me/notifications'

export interface Token {
    id: number
    token: string
}

export const submitToken = async (token: string) =>{
    const respone = await axios.post(TOKEN_SERVER_URL, {token})
    const result = respone.data as Token
    return result
}

export const getToken = async (id: number | string ) => {
    const respone = await axios.get(`${TOKEN_SERVER_URL}/${id}`)
    const result = respone.data as Token
    return result

}

export const sendPushNotification = async(token: string, title: string, body:string) =>{
    const message = {
        to: token,
        sound: 'default',
        title,
        body,
      };

      await axios.post(EXPO_SERVER_URL, message)
      alert('Triệu hồi 💁 thành công!')
}
