import Block from '../../../utils/Block/block'
import tpl from './element.hbs'
import { Chats } from '../../../api/ChatAPI'

interface ElementProps {
  chats: Chats
  tagName?: string
  selectedChat?: number
  events?: any
}

export class ChatTitle extends Block<ElementProps> {
  constructor(props: ElementProps) {
    super({ ...props, tagName: 'ul' })
  }

  protected render(): DocumentFragment {
    // console.log('CHAT TITLE PROPS', this.props)
    return this.compile(tpl, this.props)
  }
}
