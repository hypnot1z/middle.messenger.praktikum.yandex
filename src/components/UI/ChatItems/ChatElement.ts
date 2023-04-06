import Block from '../../../utils/Block/block'
import tpl from './element.hbs'
// import tpl from './list.hbs'
import { Chats } from '../../../api/ChatAPI'
import store from '../../../utils/Store'
import './ChatItemsModule.scss'
import { Image } from '../Img'
import DefaultImg from '../../../img/chat-def.svg'
import { Element } from './Element'

export const avatarUrl = `https://ya-praktikum.tech/api/v2/resources/`

interface ElementProps {
  chats?: Chats[]
  tagName?: string
  src?: string
  selectedChat?: number
  events?: any
}

export class ChatTitle extends Block<ElementProps> {
  constructor(props: ElementProps) {
    super({
      ...props,
      tagName: 'ul',
      // src: props.chats.avatar ? `${avatarUrl}${props.avatar}` : DefaultImg,
      events: {
        click: (event: Event) => this.selectChat(event),
      },
    })
    console.log('Chattitle props', this.props)
  }

  init() {
    // this.children.avatar = new Image({
    //   src: this.props.avatar ? `${avatarUrl}${this.props.avatar}` : DefaultImg,
    //   class: 'chat-avatar',
    //   alt: 'Avatar',
    //   tagName: 'img'
    // })
    // this.children.element = new Element({
    //   chats: this.props.chats,
    //   tagName: 'li',
    // })
    // this.setProps({ src: 'data' })
  }

  private selectChat(event: Event) {
    const chatId = (event.target! as HTMLLIElement).id
    const chats = Array.from(this.props.chats)
    function selChat(arr: Chats[], id: number) {
      return arr.filter((obj) => obj.id === id)
    }
    const activeChat = selChat(chats, Number(chatId))
    store.set('selectedChat', activeChat[0])
    store.set('selectedChatName', activeChat[0].title)
  }

  private updateAvatar(arr: any) {
    return arr.map((obj: any) => {
      return {
        ...obj,
        src: obj.avatar ? `${avatarUrl}${obj.avatar}` : DefaultImg,
      }
    })
  }

  protected componentDidUpdate(
    oldProps: ElementProps,
    newProps: ElementProps
  ): boolean {
    const chats = Array.from(this.props.chats)
    console.log('CHAT ELEMNT CDU', chats)
    return false
  }

  protected setProps: (nextProps: ElementProps) => void

  // public activeItem(id: string): void {
  //   const chatItem: HTMLElement | null =
  //     document.getElementById(id)
  //   chatItem!.classList.add('active')
  // }

  protected render(): DocumentFragment {
    console.log('render', this.props)
    return this.compile(tpl, this.props)
  }
}
