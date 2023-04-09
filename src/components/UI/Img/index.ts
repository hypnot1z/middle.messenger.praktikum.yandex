import Block from '../../../utils/Block/block'
import tpl from './tpl.hbs'
import './ImageModule.scss'
// import { PropsWithRouter, withRouter } from '../../../hocs/withRouter'
// import avatarCap from './avatarCap.svg'

// const src = avatarCap

// interface ImgProps extends PropsWithRouter {
//   to?: string
//   src?: string
//   alt?: string
//   class?: string
//   events?: {
//     click: () => void
//   }
// }
interface ImgProps {
  tagName: string
  src: string
  alt?: string
  class?: string
  events?: {
    click: () => void
  }
}

export class Image extends Block<ImgProps> {
  constructor(props: ImgProps) {
    // props.src = src
    // if (props.to) {
    //   props.events = {
    //     click: () => this.navigate(),
    //   }
    // }
    super({
      ...props
      
    })
  }

  protected init(): void {
    this.element?.setAttribute('src', this.props.src)
    this.element?.setAttribute('alt', this.props.alt ? this.props.alt : '')
    this.element?.setAttribute('class', this.props.class ? this.props.class : '')
  }
  // navigate() {
  //   this.props.router.go(this.props.to!)
  // }

  render() {
    return this.compile(tpl, this.props)
  }
}

// export const Image = withRouter(BaseImg)
