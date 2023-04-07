import Block from "../../../utils/Block/block";
import tpl from './tpl.hbs'
import './ElementModule.scss'
import { Chats } from "../../../api/ChatAPI";

interface ElementProps extends Chats {
    chats: Chats[]
    tagName:string
}

export class Element extends Block<ElementProps> {
    constructor(props: ElementProps){
        super({...props})
        console.log('Elements props', this.props)
    }

    protected render(): DocumentFragment {
        console.log('RENDER CHAT Element')
        return this.compile(tpl, this.props)
    }
}