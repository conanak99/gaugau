import React from "react";
import { View, Text, Button } from "react-native";
import { Header } from "react-native-elements";
import styled from "styled-components/native";
import { Heading } from "../components";
import * as Notifications from 'expo-notifications';
import { Token, submitToken } from "../services/api";

async function getNotificationToken(){
  const {status} = await Notifications.getPermissionsAsync();
  if(status !== 'granted'){
    const { status } = await Notifications.requestPermissionsAsync();
    if(status !== 'granted'){
      alert('Fail to get token Notifications');
      return
    }
  }

  const tokenData = await Notifications.getExpoPushTokenAsync()
  const token = tokenData.data
  console.log({token})
  return token
}

const Page = styled.View`
  padding: 40px 30px 0 30px;
`;

const BoyScreen: React.FC = () => {
  const [token, setToken] = React.useState<Token | undefined>()


  return (
    <View>
      <Header
        centerComponent={{ text: "Màn hình bạn nam 💆", style: { color: "#fff" } }}
      />
      <Page>
        <Heading>{token ? `Mã số của bạn là ${token.id}` : `Bạn chưa có mã, bấm vào đây`}</Heading>
        <Button title="Bấm vào để lấy mã" onPress={ async ()=>{

          const token = await getNotificationToken()
            if(token){
              const storedToken = await submitToken(token)
              setToken(storedToken)
            }
        }
        }/>
      </Page>
    </View>
  );
};

export default BoyScreen;