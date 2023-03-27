import Block from '../../../utils/Block/block'
import tpl from './tpl.hbs'
import './LinkModule.scss'
import { PropsWithRouter, withRouter } from '../../../hocs/withRouter'

interface LinkProps extends PropsWithRouter {
  tagName?: string
  to: string
  label: string
  events?: {
    click: () => void
  }
}

class BaseLink extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({
      ...props,
      tagName: 'a',
      events: {
        click: () => this.navigate(),
      },
    })
  }

  navigate() {
    this.props.router.go(this.props.to)
  }

  render() {
    return this.compile(tpl, this.props)
  }
}

export const Link = withRouter(BaseLink)
