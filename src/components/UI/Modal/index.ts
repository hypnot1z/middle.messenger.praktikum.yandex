import Block from '../../../utils/Block/block'
import tpl from './tpl.hbs'
import './ModalModule.scss'
import { User } from '../../../api/UserAPI'

interface ModalProps {
  users: User[]
}

export class Modal extends Block<ModalProps> {
  constructor(props: ModalProps) {
    super({ ...props })
    console.log('Modal props', this.props)
  }

  protected render(): DocumentFragment {
    return this.compile(tpl, this.props)
  }
}
