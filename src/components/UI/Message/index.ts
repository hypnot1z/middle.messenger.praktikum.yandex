import Block from '../../../utils/Block/block'
import tpl from './tpl.hbs'
import './MessageModule.scss'

interface MessageProps {
  content: string
  isMine: boolean
}

export class Message extends Block<MessageProps> {
  constructor(props: MessageProps) {
    super({ ...props })
    // console.log('MSG PROPS', this.props)
  }
  protected init(): void {
    this.element?.classList.add('msg-container')
  }

  protected render(): DocumentFragment {
    return this.compile(tpl, { ...this.props, tagName: 'div' })
  }
}
