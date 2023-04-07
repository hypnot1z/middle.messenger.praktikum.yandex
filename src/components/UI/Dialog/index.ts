import Block from "../../../utils/Block/block";
import tpl from './tpl.hbs'
import './DialogModule.scss'
import { User } from "../../../api/UserAPI";

interface LastMessage {
    content: string
    id: number
    time: string
    user: User
}

interface DialogProps {
    avatar: string
    created_by: number
    id: number
    src: string
    title: string
    unread_count: number
    last_message: LastMessage
}

export class Dialog extends Block<DialogProps> {
    constructor(props: DialogProps) {
        super({...props})
    }

    init() {
        this.element?.classList.add('msg')
    }

    protected render(): DocumentFragment {
        return this.compile(tpl, this.props)
      }
}