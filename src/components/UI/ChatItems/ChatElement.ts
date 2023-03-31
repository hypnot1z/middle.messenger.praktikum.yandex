import Block from "../../../utils/Block/block"
import EventBus from "../../../utils/Block/event-bus"
import tpl from "./element.hbs"
import store, { withStore } from '../../../utils/Store'
// import ButtonConfirm from "components/button-confirm/button-confirm"
import ChatController from "../../../controllers/ChatController"

interface ChatProps {
  // tagName?: string
    id: number;
    title: string;
    unread_count: number;
    selectedChat: any;
    last_message?: string;
    events: {
      click: (e?: Event) => void;
    }
  }

  interface Titles {
    titles: string[]
  }

 
  
  class ChatBase extends Block<Titles> {
    constructor(props: Titles) {
      // props.tagName = 'div'
      super({...props});
    }
    
    init() {
      // this.element?.title = this.props
      // Добавить кнопку удаления
    }
    
    protected componentDidUpdate(oldProps: Titles, newProps: Titles): boolean {
// this.createElement()      
// this.render()
      // this.createElement(this.props[0])
      
      return true
    }
    
    createElement() {
      // console.log('ChatBase Props', this.props)
      // console.log('ChatBase Store', store.getState())
      const state = store.getState()
      console.log('State chats',state.chats)
      if (state.chats) {
        console.log("State EST")
        // const titels = state.chats.map((el: any) => el.title)
        // console.log(titels[0])
        // console.log(state.chats.length)
        // const titel = titels[0]
        // this.element!.title = titel
      }
      // console.log(titels)
      
      // this.element.title = item.title
    }

    delete() {
        // Контроллер удаления
    //   ChatController.delete(this.props.id)
    }
    protected render(): DocumentFragment {
      // const state = store.getState()
      // // console.log('State chats',state.chats)
      // let title: string[] = []
      // if (state.chats) {
      //   console.log("State EST")
      //   title = state.chats.map((el: any) => el.title)
      //   // return this.compile(tpl, title);
      // }
      const titles = {titles: this.props.titles}
      console.log('render props', titles)
      return this.compile(tpl, titles);
    }
  }
  
  const withChats = withStore(state => (state.chats ? {titles: [...(state.chats.map((el: any) => el.title))]} : []));
  export const ChatList = withChats(ChatBase)
  // const PageWithChats = withChats(ChatBase)
  // const Chat = new PageWithChats({})
  // export default Chat
//   export const Chat = withSelectedChat(ChatBase);