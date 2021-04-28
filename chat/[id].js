import styled from "styled-components";
import Sidebar from "../../components/Sidebar";
import ChatScreen from "../components/ChatScreen";
function Chat() {
  return (
    <Container>
      <Head>
        <title>Chat</title>
        <h1>This is a chat</h1>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen />
      </ChatContainer>
    </Container>
  );
}

export default Chat;

export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.id);
}

const Container = styled.div`
  display: flex;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }
  --ms-overflow-style: none;
  scrollbar-width: none;
`;
