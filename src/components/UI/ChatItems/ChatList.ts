import { Link } from "../Link";
import Block from "../../../utils/Block/block";
import { withStore } from "../../../utils/Store";
import ChatController from "../../../controllers/ChatController";
import Chat from "./ChatElement";
import tpl from "./list.hbs"

interface ChatsListProps {
  chats: any[];
}

class ChatsListBase extends Block {
  constructor(props: ChatsListProps) {
    super({...props});
  }

  protected init() {
    this.children.chats = new Chat({...this.props})

}

newChat(){


}

protected componentDidUpdate(oldProps: ChatsListProps, newProps: ChatsListProps): boolean {
    this.children.chats = this.createChats(newProps);

    return true;
  }

  private createChats(props: ChatsListProps) {
    console.log('Chat list', props)
    return this.props.chats
    // return props.chats.map(data => {
    //   return new Chat({
    //     ...data,
    //     events: {
    //       click: () => {
    //         // ChatController.selectChat(data.id);
    //         // ChatController.getUsers(data.id)
    //       }
    //     }
    //   });
    // })
  }

  protected render(): DocumentFragment {
    return this.compile(tpl, {...this.props});
  }
}

const withChats = withStore((state) => (state.chats));

export const ChatsList = withChats(ChatsListBase);