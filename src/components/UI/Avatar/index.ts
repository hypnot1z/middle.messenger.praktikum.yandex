import { User } from '../../../api/UserAPI'
import Block from '../../../utils/Block/block'
import { withStore } from '../../../utils/Store'
import tpl from './tpl.hbs'
import DefaultImg from '../../../img/avatarCap.svg'
import Input from '../Input'
import UsersController from '../../../controllers/UserController'
import { Image } from '../Img'
import './AvatarModule.scss'

export const avatarUrl = `https://ya-praktikum.tech/api/v2/resources/`

interface AvatarProps extends User {
  src?: string
  events?: {
    change?: (e: Event) => void
    click: () => void
  }
}

export class Avatar extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    super({
      ...props,
      // events: { click: () => this.show() },
      // src: props.avatar ? `${avatarUrl}${props.avatar}` : DefaultImg,
    })
  }

  init() {
    this.children.avatar = new Image({
      src: this.props.avatar ? `${avatarUrl}${this.props.avatar}` : DefaultImg,
      class: 'avatar',
      alt: 'Avatar',
      tagName: 'img'
    })

    this.children.upload = new Input({
      class: 'hidden-input',
      type: 'file',
      value: this.props.src,
      name: 'avatar',
      id: 'avatar',
      accept: '.png, .jpg, .jpeg',
      events: { change: (e: Event) => this.updateAvatar(e) },
    })
  }

  updateAvatar(e: Event) {
    const file = (e.target as HTMLInputElement).files![0]
    const fd = new FormData()
    if (file) {
      fd.append('avatar', file)
      return UsersController.changeAvatar(fd)
    } else {
      return console.log('No file')
    }
  }

  //   protected componentDidUpdate(oldProps: AvatarProps, newProps: AvatarProps): boolean {
  //       if (oldProps.avatar !== newProps.avatar) {
  //         this.props.src =
  //       }
  //     return false
  //   }

  protected render(): DocumentFragment {
    return this.compile(tpl, { ...this.props })
  }
}

const withUser = withStore((state) => ({ ...state.user }))

export default withUser(Avatar)
