import Block from '../../../utils/Block/block'
import tpl from './tpl.hbs'
import './AvaModule.scss'
import { PropsWithRouter, withRouter } from '../../../hocs/withRouter'
import avatarCap from './avatarCap.svg'

const src = avatarCap

interface AvaProps extends PropsWithRouter {
  to: string
  src?: string
  events?: {
    click: () => void
  }
}

class BaseAva extends Block<AvaProps> {
  constructor(props: AvaProps) {
    props.src = src
    super({
      ...props,
      events: {
        ...props.events,
        click: () => this.navigate(),
      },
    })
  }

  navigate() {
    this.props.router.go(this.props.to)
  }

  render() {
    return this.compile(tpl, this.props)
  }
}

export const Avatar = withRouter(BaseAva)
