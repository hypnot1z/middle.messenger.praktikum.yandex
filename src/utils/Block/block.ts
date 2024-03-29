import EventBus from './event-bus'
import { nanoid } from 'nanoid'
import { TemplateDelegate } from 'handlebars'

export class Block<
  // P = any,
  P extends Record<string, any> = any,
  E extends HTMLElement = HTMLElement
> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const

  public id = nanoid(5)
  private tagName: string

  private eventBus: () => EventBus
  private _element: E | null = null
  protected props: P
  public children: Record<string, Block | Block[]>

  constructor(propsWithChildren: P) {
    const eventBus = new EventBus()

    const { props, children } = this._getChildrenAndProps(propsWithChildren)
    const { tagName } = props
    this.tagName = tagName

    this.children = children

    this.props = this._makePropsProxy(props)

    this.eventBus = () => eventBus

    this._registerEvents(eventBus)

    eventBus.emit(Block.EVENTS.INIT)
  }

  private _getChildrenAndProps(ChildrenAndProps: P): {
    props: P
    children: Record<string, Block | Block[]>
  } {
    const props: Record<string, any> = {}
    const children: Record<string, Block> = {}

    Object.entries(ChildrenAndProps).forEach(([key, value]) => {
      if (Array.isArray(value) && value.every((v) => v instanceof Block)) {
        children[key as string] = value
      } else if (value instanceof Block) {
        children[key as string] = value
      } else {
        props[key] = value
      }
    })

    return { props: props as P, children }
  }

  private _addEvents() {
    const { events = {} } = this.props as unknown as {
      events: Record<string, () => void>
    }

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName])
    })
  }

  private _removeEvents() {
    const { events = {} } = this.props as Record<string, () => void>

    if (events) {
      Object.entries(events).forEach(([event, listener]) => {
        this._element!.removeEventListener(event, listener)
      })
    }
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  private _createResources() {
    this._element = this._createDocumentElement(this.tagName) as E
    if (this.tagName === 'div') {
      if (this._element.classList) {
        this.props.className ? this._element.classList.add(this.props.className) :
        this._element.classList.add('wrapper')
      }
    }
  }

  private _createDocumentElement(tagName: string = 'div') {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName)
  }

  private _init() {
    this._createResources()

    this.init()

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
  }

  protected init() {}

  private _componentDidMount() {
    this.componentDidMount()
  }

  // Может переопределять пользователь, необязательно трогать
  protected componentDidMount() {}

  protected dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((ch) => ch.dispatchComponentDidMount())
      } else {
        child.dispatchComponentDidMount()
      }
    })
  }

  private _componentDidUpdate(oldProps: P, newProps: P) {
    const response = this.componentDidUpdate(oldProps, newProps)
    if (!response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
    }
  }

  // Может переопределять пользователь, необязательно трогать
  protected componentDidUpdate(oldProps: P, newProps: P) {
    return true
  }

  protected setProps = (nextProps: P) => {
    if (!nextProps) {
      return
    }

    const oldValue = this.props
    Object.assign(this.props, nextProps)
    this._componentDidUpdate(oldValue, this.props)

    const { children, props } = this._getChildrenAndProps(nextProps)

    if (Object.values(children).length) {
      Object.assign(this.children, children)
    }

    if (Object.values(props).length) {
      Object.assign(this.props, props)
    }

    this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldValue, this.props)
  }

  get element() {
    return this._element
  }

  private _render() {
    const fragment = this.render()
    this._element!.innerHTML = ''
    this._element!.append(fragment)
    this._addEvents()
  }

  protected compile(template: TemplateDelegate, context: any) {
    const contextAndStubs = { ...context }

    Object.entries(this.children).forEach(([name, component]) => {
      contextAndStubs[name] = `<div data-id="${component.id}"></div>`
    })

    const html = template(contextAndStubs)

    const temp = document.createElement('template')

    temp.innerHTML = html

    Object.entries(this.children).forEach(([_, component]) => {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`)

      if (!stub) {
        return
      }

      component.getContent()?.append(...Array.from(stub.childNodes))

      stub.replaceWith(component.getContent()!)
    })

    return temp.content
  }

  protected render(): DocumentFragment {
    return new DocumentFragment()
  }

  getContent() {
    return this.element
  }

  private _makePropsProxy(props: P) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this
    return new Proxy(props, {
      get(target, prop: string | Symbol) {
        const value = target[prop as keyof P]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set(target, prop: string | Symbol, value) {
        const oldTarget = { ...target }
        target[prop as keyof P] = value

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target)
        return true
      },
      deleteProperty() {
        throw new Error('Нет доступа')
      },
    })
  }

  show() {
    this.getContent()!.style.display = 'block'
  }

  hide() {
    this.getContent()!.style.display = 'none'
  }
}

export default Block
