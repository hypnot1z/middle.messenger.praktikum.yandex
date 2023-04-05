import tpl from './tpl.hbs'
// import './InputModule.scss'
import Block from '../../../utils/Block/block'

interface InputProps {
  tagName?: string
  type: string
  name: string
  placeholder?: string
  class?: string
  id?: string
  accept?: string
  value?: string | HTMLImageElement | File
  events?: {
    input?: (e: FocusEvent) => void
    focus?: (e: FocusEvent) => void
    blur?: (e: FocusEvent) => void
    change?: (e: Event) => void
  }
}

export default class Input extends Block<InputProps, HTMLInputElement> {
  constructor(props: InputProps) {
    props.tagName = 'input'
    super({ ...props })
  }

  protected init(): void {
    this.element!.classList.add(this.props.class!)
    this.element!.placeholder = this.props.placeholder!
    this.element!.value = this.props.value
    this.element!.name = this.props.name
    this.element!.type = this.props.type
    this.props.id ? (this.element!.id = this.props.id) : null
    this.props.class ? this.element!.classList.add(this.props.class) : null
  }
  get name() {
    return this.element!.name
  }
  get value() {
    return this.element!.value
  }
  set value(val) {
    this.element!.value = val
  }

  render() {
    return this.compile(tpl, this.props)
  }
}
