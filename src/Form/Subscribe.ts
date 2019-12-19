export default class MySubscribe {
  subs: any
  constructor() {
    this.subs = {} //{eventName: []}
  }

  subscribe(eventName: string, callback?: Function): any {
    if (!eventName) {
      throw new Error('need event name')
    }
    if (!callback) {
      return this.subscribeCurry(eventName)
    }
    const keys = Object.keys(this.subs)
    if (!keys.includes(eventName)) {
      this.subs[eventName] = []
    }
    this.subs[eventName].push(callback)
  }

  subscribeCurry = (eventName: string) => (callback: Function) => {
    const keys = Object.keys(this.subs)
    if (!keys.includes(eventName)) {
      this.subs[eventName] = []
    }
    this.subs[eventName].push(callback)
  }

  unsubscribe: any = () => { }


  dispatchEvent(eventName: string, cb?: Function) {
    const callbacks = this.subs[eventName]
    if (!callbacks) {
      console.log('eventName 不存在')
      return
    }
    const result: any = {}
    for (const callback of callbacks) {
      result[eventName] = callback()
    }
    cb && cb(result)
    return result
  }

  dispatchEventAll(cb?: Function): any {
    const result = Object.keys(this.subs).map(key => this.dispatchEvent(key))
    cb && cb(result)
    return result
  }
}