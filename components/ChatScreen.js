import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { useRouter } from "next/router";
import { auth, db } from "../firebase";
import { Avatar, IconButton } from "@material-ui/core";
import { MoreVertIcon } from "@material-ui/icons/MoreVert";
import { AttachFileIcon } from "@material-ui/icons/AttachFile";
import { useCollection } from "react-firebase-hooks";
import InsertEmoticonIcon, { SettingsInputAntenna } from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import Message from "./Message";
import firebase from "firebase";

function ChatScreen({ chat, messages }) {
  const [user] = useAuthState(auth);
  const [input, useInput] = useState("");
  const router = useRouter();

  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map(message => (
        <Message
          key={message.id}
          user={message.data.user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime()
          }}
        />
      ));
    }
  };

  const sendMessage = e => {
    e.preventDefault();

    db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp()
      },
      { merge: true }
    );

    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL
    });
    setInput("");
  };

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
      <MessageContainer>
        {showMessages()}
        <EndOfMessage />
      </MessageContainer>
      <InputContainer>
        <InsertEmoticonIcon />
        <Input value={input} onChange={e => setInput(e.target.value)} />
        <button hidden disabled={!input} type="submit" onclick={sendMessage}>
          Send Message
        </button>
        <MicIcon />
      </InputContainer>
    </Container>
  );
}

export default ChatScreen;

const Container = styled.div`
  height: 100vh;
  border-right: 1px solid whitesmoke;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const Input = styled.div`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 20px;
  margin-left: 15px;
  margin-right: 15px;
`;
const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`;

const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  align-items: center;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const HeaderInfo = styled.div`
  margin-left: 15px;
  flex: 1;
  > h3 {
    margin-bottom: 3px;
  }

  > p {
    font-size: 14px;
    color: #ccc;
  }
`;
s;

const HeaderIcons = styled.div``;

const EndOfMessage = styled.div``;

const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5e5e5;
  min-height: 90vh;
`;
