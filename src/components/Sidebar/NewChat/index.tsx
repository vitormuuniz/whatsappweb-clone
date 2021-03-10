import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React, { useEffect, useState } from "react";
import { addNewChat, getContactsList } from "../../../config/Api";
import { User } from "../../../interfaces/User";
import {
  Contact,
  ContactImage,
  ContactName,
  ContactsList,
  Content,
  Header,
  HeaderBackButton,
  HeaderTitle,
} from "./styles";

interface IProps {
  chatList: User[];
  setChatList: Function;
  user: User;
  showNewChat: boolean;
  setShowNewChat: Function;
}
const NewChat: React.FC<IProps> = ({
  chatList,
  setChatList,
  user,
  showNewChat,
  setShowNewChat,
}) => {
  const [list, setList] = useState<User[]>([]);

  useEffect(() => {
    const getChatList = async () => {
      if (user !== null) {
        let results = await getContactsList(user.id!);
        setList(results);
      }
    };

    getChatList();
  }, [user, setList]);

  async function createNewChat(user2: User) {
    await addNewChat(user, user2);

    handleClose();
  }

  function handleClose() {
    setShowNewChat(false);
  }

  return (
    <Content showNewChat={showNewChat}>
      <Header>
        <HeaderBackButton>
          <ArrowBackIcon htmlColor="#FFF" onClick={handleClose} />
        </HeaderBackButton>
        <HeaderTitle>Nova Conversa</HeaderTitle>
      </Header>
      <ContactsList>
        {list.map((contact: User, key: number) => (
          <Contact key={key} onClick={() => createNewChat(contact)}>
            <ContactImage src={contact.avatar} />
            <ContactName>{contact.name}</ContactName>
          </Contact>
        ))}
      </ContactsList>
    </Content>
  );
};

export { NewChat };