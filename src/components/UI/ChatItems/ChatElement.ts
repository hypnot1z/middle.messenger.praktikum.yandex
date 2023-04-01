import Block from '../../../utils/Block/block'
import tpl from './element.hbs'

interface ElementProps {
  title: string[]
  id: number
}

export class ChatTitle extends Block<ElementProps> {
  constructor(props: ElementProps) {
    super(props)
  }

  protected render(): DocumentFragment {
    return this.compile(tpl, this.props)
  }
}
