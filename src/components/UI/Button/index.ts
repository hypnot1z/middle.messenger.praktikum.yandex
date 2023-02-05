import Handlebars from 'handlebars'
import tpl from 'bundle-text:./tpl.hbs'
import './ButtonModule.scss'
import Block from '../../../utils/Block/block'

type buttonProps = {
  text?: string
  id?: string
  type?: string
  class?: string
}

export default class Button extends Block {
  constructor(props: buttonProps) {
    super('button', props)
  }

  render() {
    const compile = Handlebars.compile(tpl)
    const res = compile({
      text: this.props.text,
      id: this.props.id,
      type: this.props.type,
      class: this.props.class,
    })
    return res
  }
}
