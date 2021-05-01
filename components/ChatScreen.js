import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { useRouter } from "next/router";
import { auth } from "../firebase";

function ChatScreen({ chat, messages }) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  return (
    <Container>
      <Header>
        <Avatar />
        <HeaderInfo>
          <h3>Recipient email</h3>
          <p>Last seen at</p>
        </HeaderInfo>
        <HeaderIcons></HeaderIcons>
      </Header>
    </Container>
  );
}

export default ChatScreen;

const Container = styled.div``;
const Header = styled.div``;
const HeaderInfo = styled.div``;
const HeaderIcons = styled.div``;
