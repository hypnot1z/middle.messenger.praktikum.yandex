import Block from "../../utils/Block/block";
import tpl from './tpl.hbs'

interface ProfileFieldProps {
    tagName?: string
    name: string
    value: string | number
}

export class ProfileField extends Block<ProfileFieldProps> {
    constructor(props: ProfileFieldProps) {
        props.tagName = 'div'
        super(props)
    }

    protected render(): DocumentFragment {
        return this.compile(tpl, this.props)
    }
}