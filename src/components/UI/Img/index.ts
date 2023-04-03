import Block from '../../../utils/Block/block'
import tpl from './tpl.hbs'
import './ImageModule.scss'
import { PropsWithRouter, withRouter } from '../../../hocs/withRouter'
// import avatarCap from './avatarCap.svg'

// const src = avatarCap

interface ImgProps extends PropsWithRouter {
  to?: string
  src?: string
  size?: string
  alt?: string
  class?: string
  events?: {
    click: () => void
  }
}

class BaseImg extends Block<ImgProps> {
  constructor(props: ImgProps) {
    // props.src = src
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

export const Image = withRouter(BaseImg)
