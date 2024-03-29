type Callback = (...args: any) => void

export default class EventBus {
  private readonly listeners: Record<string, Array<Callback>> = {}

  constructor() {
    this.listeners = {}
  }

  on(event: string, callback: Callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
  }

  off(event: string, callback: Callback) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    )
  }

  emit(event: string, ...args: any[]) {
    if (!this.listeners[event]) {
      return
      throw new Error(`Нет события: ${event}`)
    }

    this.listeners[event].forEach(function (listener) {
      listener(...args)
    })
  }
}
