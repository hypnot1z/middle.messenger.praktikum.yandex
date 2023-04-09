import Block from '../../../utils/Block/block'
import tpl from './tpl.hbs'

interface ProfileFieldProps {
  //   name: string
  value: string | number
}

export class ProfileField extends Block<ProfileFieldProps> {
  constructor(props: ProfileFieldProps) {
    super(props)
  }

  protected render(): DocumentFragment {
    return this.compile(tpl, this.props)
  }
}
