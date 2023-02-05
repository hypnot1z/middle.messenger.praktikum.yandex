import Handlebars from 'handlebars'
import tpl from 'bundle-text:./tpl.hbs'
import './ChatModule.scss'
import Block from '../../../utils/Block/block'
import Button from '../../UI/Button'

const buttonSend = new Button({
  text: 'Отправить',
  id: 'send-btn',
  type: 'submit',
})
const buttonDots = new Button({
  text: '3 Dots',
  id: 'dots-btn',
  type: '',
})
class PageChat extends Block {
  constructor(props) {
    super('div', props)
  }

  render() {
    const compile = Handlebars.compile(tpl)
    const res = compile({
      buttonSend: buttonSend.render(),
      buttonDots: buttonDots.render(),
    })

    return res
  }
}

const Chat = new PageChat()
export default Chat
