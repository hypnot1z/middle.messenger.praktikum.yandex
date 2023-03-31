import Block from '../../../utils/Block/block'
import tpl from './element.hbs'

interface ElementProps {
  title: string[]
}

export class ChatTitle extends Block<ElementProps> {
  constructor(props: ElementProps) {
    super(props)
    console.log('EleMENT PROPS', this.props['title'])
  }

  protected render(): DocumentFragment {
    const titles = this.props.title
    console.log('TITLES', titles)
    return this.compile(tpl, this.props)
  }
}
