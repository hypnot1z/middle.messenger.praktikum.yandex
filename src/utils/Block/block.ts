import EventBus from './event-bus'
import Pattern from '../pattern'

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  }

  private _meta: {
    tagName: string
    props: any
  }
  private eventBus: () => EventBus
  private _element: HTMLElement | null = null
  protected props: any
  public children: Record<string, Block>

  constructor(tagName = 'div', propsWithChildren: any = {}) {
    const eventBus = new EventBus()
    const { props, children } = this._getChildrenAndProps(propsWithChildren)
    this._meta = {
      tagName,
      props,
    }
    // const pattern: Record<string, string> = pattern
    this.children = children
    this.props = this._makePropsProxy(props)

    this.eventBus = () => eventBus

    this._registerEvents(eventBus)

    eventBus.emit(Block.EVENTS.INIT)
  }

  private _getChildrenAndProps(ChildrenAndProps: any) {
    const props: Record<string, any> = {}
    const children: Record<string, Block> = {}

    Object.entries(ChildrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value
      } else {
        props[key] = value
      }
    })

    return { props, children }
  }

  private _addEvents() {
    const { events = {} } = this.props as { events: Record<string, () => void> }

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName])
    })
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  private _createResources() {
    const { tagName } = this._meta
    this._element = this._createDocumentElement(tagName)
    if (tagName === 'div') {
      this._element.classList.add('wrapper')
    }
  }

  private _createDocumentElement(tagName: string) {
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

    Object.values(this.children).forEach((child) =>
      child.dispatchComponentDidMount()
    )
  }

  private _componentDidUpdate(oldProps: any, newProps: any) {
    const response = this.componentDidUpdate(oldProps, newProps)
    if (!response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
    }
  }

  // Может переопределять пользователь, необязательно трогать
  protected componentDidUpdate(oldProps: any, newProps: any) {
    return true
  }

  protected setProps = (nextProps: any) => {
    if (!nextProps) {
      return
    }

    Object.assign(this.props, nextProps)
  }

  get element() {
    return this._element
  }

  private _render() {
    const fragment = this.render()
    this._element!.innerHTML = ''
    this._element!.append(fragment)
    this._addEvents()
    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы возвращать из compile DOM-ноду
    // this._element!.innerHTML = block
  }

  protected compile(template: (context: any) => string, context: any) {
    const contextAndStubs = { ...context }

    Object.entries(this.children).forEach(([name, component]) => {
      contextAndStubs[name] = `<div data-id="{component.id}"></div>`
    })

    const html = template(contextAndStubs)

    const temp = document.createElement('template')

    temp.innerHTML = html

    Object.entries(this.children).forEach(([_, component]) => {
      const stub = temp.content.querySelector(`[data-id="{component.id}"]`)

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

  validation(event: Event) {
    console.log(typeof event.target)
    const element: HTMLElement | null = event.target
    const elementName: string = element.name
    const etarget = element.nextElementSibling
    event.target.addEventListener('blur', () => {
      const targetPattern: RegExp = new RegExp(Pattern[elementName])
      const stringValue: string = event.target.value
      if (!targetPattern.test(stringValue)) {
        etarget.style.display = 'block'
      } else {
        etarget.style.display = 'none'
      }
    })
  }

  private _makePropsProxy(props: any) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this
    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set(target, prop: string, value) {
        const oldTarget = { ...target }
        target[prop] = value

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
