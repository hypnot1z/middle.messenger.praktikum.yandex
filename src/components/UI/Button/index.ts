import tpl from './tpl.hbs'
import './ButtonModule.scss'
import Block from '../../../utils/Block/block'

interface ButtonProps {
  tagName?: string
  text?: string
  id?: string
  type: string
  class?: string
  events?: any
}

export default class Button extends Block<ButtonProps, HTMLButtonElement> {
  constructor(props: ButtonProps) {
    props.tagName = 'button'
    super(props)
  }

  init() {
    this.element!.classList.add(this.props.class!)
    this.element!.id = this.props.id!
    this.element!.type = this.props.type
  }

  render() {
    return this.compile(tpl, this.props)
  }
}
