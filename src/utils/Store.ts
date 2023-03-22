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

export interface BlockConstructable<P extends Record<string, any>> {
  new (props: P): Block<P>
}

export function withStore(mapStateToProps: (state: any) => any) {
  return function wrap(Component: BlockConstructable<Record<string, any>>) {
    let previousState: any

    return class WithStore extends Component {
      constructor(props: any) {
        previousState = mapStateToProps(store.getState())

        super({ ...props, ...previousState })

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
