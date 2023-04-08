import tpl from './tpl.hbs'
import './ButtonModule.scss'
import Block from '../../../utils/Block/block'
import { User } from '../../../api/UserAPI'

interface ButtonProps {
  users: User[]
  tagName?: string
  text?: string
  type: string
  class?: string
  events?: {
    click: () => void
  }
}

export default class ButtonDel extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    props.tagName = 'ul'
    super(props)
  }

  protected init(): void {
    this.element?.classList.add('del-usr')
  }

  render() {
    const { users } = this.props
    console.log('USERS', this.props)
    return this.compile(tpl, users)
  }
}
