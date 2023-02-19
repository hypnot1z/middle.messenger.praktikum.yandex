import tpl from './tpl.hbs'
// import './InputModule.scss'
import Block from '../../../utils/Block/block'

interface InputProps {
  type: string
  name: string
  value?: string
  placeholder?: string
  class?: string
  events?: any
}

export default class Input extends Block {
  constructor(props: InputProps) {
    super('input', props)
  }

  protected init(): void {
    this.element?.classList.add(this.props.class)
    this.element!.placeholder = this.props.placeholder
    this.element!.name = this.props.name
    this.element!.type = this.props.type
    this.element!.value = this.props.value
  }

  render() {
    return this.compile(tpl, this.props)
  }
}
