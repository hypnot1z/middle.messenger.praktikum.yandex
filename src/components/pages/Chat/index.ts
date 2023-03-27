import tpl from './tpl.hbs'
import './ChatModule.scss'
import Block from '../../../utils/Block/block'
import Button from '../../UI/Button'

interface ChatProps {
  tagName?: string
}
class PageChat extends Block<ChatProps> {
  constructor(props: ChatProps) {
    props.tagName = 'div'
    super(props)
  }

  render() {
    return this.compile(tpl, this.props)
  }

  init() {
    this.children.buttonSend = new Button({
      text: 'Отправить',
      id: 'send-btn',
      type: 'submit',
    })
    this.children.buttonDots = new Button({
      text: '3 Dots',
      id: 'dots-btn',
      type: '',
    })
  }
}

const Chat = new PageChat({})
export default Chat
