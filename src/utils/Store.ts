import { set } from './helpers/Set'
import EventBus from './Block/event-bus'
import Block from './Block/block'
import { User } from '../api/AuthAPI'
import { Chats } from '../api/ChatAPI'
import { MessageInfo } from '../controllers/MessageController'

export enum StoreEvents {
  Updated = 'updated',
}

interface State {
  user?: User
  searchUser?: User[]
  selChatUsers?: User[]
  chats?: Chats[]
  selectedChatName?: string
  selectedChat?: Chats
  messages: Record<number, MessageInfo[]>
}

export class Store extends EventBus {
  private state: any = {}

  public set(keypath: string, data: unknown) {
    this.state = set(this.state, keypath, data)

    this.emit(StoreEvents.Updated, this.getState())
  }

  public getState() {
    return this.state
  }
}

const store = new Store()

window.store = store

export function withStore<SP extends Partial<any>>(
  mapStateToProps: (state: State) => SP
) {
  return function wrap<P>(Component: typeof Block<SP & P>) {
    // let previousState: any

    return class WithStore extends Component {
      constructor(props: Omit<P, keyof SP>) {
        let previousState = mapStateToProps(store.getState())
        super({ ...(props as P), ...previousState })

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
