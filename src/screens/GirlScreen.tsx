import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Button, Header, Input } from "react-native-elements";
import styled from "styled-components/native";
import { Heading, Page } from "../components";
import { Token, getToken, sendPushNotification } from "../services/api";

const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SummonButton = styled.TouchableOpacity<{ color?: string }>`
  background-color: ${(p) => p.color || "red"};
  flex: 48% 0 0;
  border-radius: 5px;
  text-align: center;
  margin-bottom: 10px;
  display: flex;
  height: 150px;
  align-items: center;
  justify-content: center;
`;
const SummonButtonText = styled.Text`
  color: white;
  font-size: 20px;
`;

const GirlScreen: React.FC = () => {
  const [tokenInput, setTokenInput] = React.useState("");
  const [token, setToken] = React.useState<Token | undefined>();

  return (
    <View>
      <Header
        centerComponent={{ text: "Màn hình bạn nữ 🤱", style: { color: "#fff" } }}
      />
      <Page>
        {/* <Text>Cái</Text> */}
        {token ? (
          <View>
            <Heading>Mã số của bạn trai là {token.id}</Heading>
            <Heading>Có thể triệu hồi bạn trai</Heading>
          </View>
        ) : (
          <View style={{ paddingTop: 15 }}>
            <Input
              value={tokenInput}
              onChangeText={setTokenInput}
              label="Mã số gấu"
              placeholder="Nhập mã số bạn nam vào đây"
            />
            <Button
              title="Xác nhận mã số"
              onPress={async () => {
                const storedToken = await getToken(tokenInput);
                setToken(storedToken);
              }}
            />
          </View>
        )}

        {token && (
          <View>
            <Heading>Triệu hồi bạn trai</Heading>

            <ButtonContainer>
              <SummonButton
                color="#e74c3c"
                onPress={() =>
                  sendPushNotification(
                    token.token,
                    "Em đói quá",
                    "Qua chở em đi ăn "
                  )
                }
              >
                <SummonButtonText>🤤Em đói</SummonButtonText>
              </SummonButton>
              <SummonButton
                color="#808000"
                onPress={() =>
                  sendPushNotification(
                    token.token,
                    "Em thèm trà sữa",
                    "Huhu em thèm Yolo"
                  )
                }
              >
                <SummonButtonText>🥳Thèm trà sữa</SummonButtonText>
              </SummonButton>

              <SummonButton
                color="#2ecc71"
                onPress={() =>
                  sendPushNotification(
                    token.token,
                    "Bệnh rồi",
                    "Đi bệnh viện thôi"
                  )
                }
              >
                <SummonButtonText>😥Em bệnh rồi</SummonButtonText>
              </SummonButton>
              <SummonButton
                color="#FF7F50"
                onPress={() =>
                  sendPushNotification(
                    token.token,
                    "Nhớ anh quá",
                    "Gọi cho em đi"
                  )
                }
              >
                <SummonButtonText>🤙Call me</SummonButtonText>
              </SummonButton>
            </ButtonContainer>
          </View>
        )}
      </Page>
    </View>
  );
};

export default GirlScreen;
