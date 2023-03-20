import Block from '../../../utils/Block/block'
import tpl from './tpl.hbs'
import styles from './LinkModule.scss'
import { PropsWithRouter, withRouter } from '../../../hocs/withRouter'

interface LinkProps extends PropsWithRouter {
  to: string
  label: string
  events?: {
    click: () => void
  }
}

class BaseLink extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super('a', {
      ...props,
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
