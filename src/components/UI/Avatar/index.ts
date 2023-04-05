import { User } from "../../../api/UserAPI";
import Block from "../../../utils/Block/block";
import { withStore } from "../../../utils/Store";
import tpl from './tpl.hbs'
import DefaultImg from '../../../img/avatarCap.svg'
import Input from "../Input";
import UsersController from "../../../controllers/UserController";
import './AvatarModule.scss'

export const avatarUrl = `https://ya-praktikum.tech/api/v2/resources/`

interface AvatarProps extends User{
src?: string
events?: {
    change?: (e: Event)=> void
    click: () => void
}
}

export class Avatar extends Block<AvatarProps> {
    constructor(props: AvatarProps) {
        super({...props,
            events: {click: () => this.show()},
            src: props.avatar ? `${avatarUrl}${props.avatar}` : DefaultImg
        })
    }

    init() {
        this.children.upload = new Input({
            class: "hidden",
            type: "file",
            value: this.props.src,
            name: "avatar",
            id: "avatar",
            accept: ".png, .jpg, .jpeg",
            events: {change: (e: Event) => this.updateAvatar(e)}
        })
    }

    public show(): void {
        const avatarInput: HTMLElement | null =
          document.getElementById('avatar')
        console.log('SHOW', avatarInput)
        avatarInput!.classList.add('show')
        
      }

    updateAvatar(e: Event) {
        const file = (e.target as HTMLInputElement).files![0]
        const fd = new FormData()
        if(file){
            fd.append("avatar", file)
             return UsersController.changeAvatar(fd)
        } else {
            return console.log("No file")
        }
    }

    protected render(): DocumentFragment {
        return this.compile( tpl, {...this.props})
    }
}

const withUser = withStore((state) => ({ ...state.user }))

export default withUser(Avatar);