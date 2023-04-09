import tpl from './tpl.hbs'
import Block from '../../../utils/Block/block'

interface PageErrProps {
  tagName?: string
  code: string
  text: string
}
export class PageErr extends Block {
  constructor(props: PageErrProps) {
    props.tagName = 'div'
    super(props)
  }

  render() {
    return this.compile(tpl, this.props)
  }
}
