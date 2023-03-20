import { set } from './helpers/Set'
import EventBus from './Block/event-bus'
import Block from './Block/block'

export enum StoreEvents {
  Updated = 'updated',
}

export class Store extends EventBus {
  private state: any = {}

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data)

    this.emit(StoreEvents.Updated, this.getState())
  }

  public getState() {
    return this.state
  }
}

const store = new Store()

export function withStore(mapStateToProps: (state: any) => any) {
  return function wrap(Component: typeof Block) {
    let previousState: any

    return class WithStore extends Component {
      constructor(tagName: string, props: any) {
        previousState = mapStateToProps(store.getState())

        super(tagName, { ...props, ...previousState })

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState())

          previousState = stateProps

          this.setProps({ ...stateProps })
        })
      }
    }
  }
}

export default store
