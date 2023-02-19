import tpl from './tpl.hbs'
import Block from '../../../utils/Block/block'

interface PageErrProps {
  code: string
  text: string
}
export class PageErr extends Block {
  constructor(props: PageErrProps) {
    super('div', props)
  }

  render() {
    return this.compile(tpl, this.props)
  }
}
