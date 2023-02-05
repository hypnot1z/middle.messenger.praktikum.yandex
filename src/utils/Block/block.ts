import EventBus from './event-bus'
import Pattern from '../pattern.js'

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  }

  private _meta: { tagName: string; props: Record<string, any> }
  private eventBus: () => EventBus
  protected _element: HTMLElement | null = null
  protected props: Record<string, any>

  constructor(tagName = 'div', props = {}) {
    const eventBus = new EventBus()
    this._meta = {
      tagName,
      props,
    }

    // const pattern: Record<string, string> = pattern

    this.props = this._makePropsProxy(props)

    this.eventBus = () => eventBus

    this._registerEvents(eventBus)
    eventBus.emit(Block.EVENTS.INIT)
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  private _createResources() {
    const { tagName } = this._meta
    this._element = this._createDocumentElement(tagName)
    this._element.classList.add('wrapper')
  }

  private init() {
    this._createResources()

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
  }

  private _componentDidMount() {
    this.componentDidMount()
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount(oldProps: Record<string, any>) {}

  private dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)
  }

  private _componentDidUpdate(
    oldProps: Record<string, any>,
    newProps: Record<string, any>
  ) {
    const response = this.componentDidUpdate(oldProps, newProps)
    if (!response) {
      return
    }
    this._render()
  }

  // Может переопределять пользователь, необязательно трогать
  private componentDidUpdate(
    oldProps: Record<string, any>,
    newProps: Record<string, any>
  ) {
    return true
  }

  setProps = (nextProps: Record<string, any>) => {
    if (!nextProps) {
      return
    }

    Object.assign(this.props, nextProps)
  }

  get element() {
    return this._element
  }

  _render() {
    const block = this.render()
    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы возвращать из compile DOM-ноду
    this._element.innerHTML = block
  }

  // Может переопределять пользователь, необязательно трогать
  render() {}

  getContent() {
    const inputs: NodeList = this.element.querySelectorAll('input') //Select all inputs on page
    inputs.forEach((el) => el.addEventListener('focus', this.validation))
    return this.element
  }

  validation(event: Event) {
    console.log('validation')
    const element: HTMLElement = event.target
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

  _makePropsProxy(props: Record<string, any>) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set(target, prop: string, value) {
        target[prop] = value

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target)
        return true
      },
      deleteProperty() {
        throw new Error('Нет доступа')
      },
    })
  }

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName)
  }

  show() {
    this.getContent().style.display = 'block'
  }

  hide() {
    this.getContent().style.display = 'none'
  }
}
