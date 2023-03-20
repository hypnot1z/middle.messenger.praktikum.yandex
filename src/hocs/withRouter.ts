import Block from '../utils/Block/block'
import Router from '../utils/Router'

export function withRouter(Component: typeof Block<any>) {
  type Props = typeof Component extends typeof Block<infer P> ? P : any

  return class WithRouter extends Component {
    constructor(tagName: string, props: Props & PropsWithRouter) {
      super(tagName, { ...props, router: Router })
    }
  }
}

export interface PropsWithRouter {
  router: typeof Router
}
