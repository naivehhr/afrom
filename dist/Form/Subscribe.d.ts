export default class MySubscribe {
    subs: any;
    constructor();
    subscribe(eventName: string, callback?: Function): any;
    subscribeCurry: (eventName: string) => (callback: Function) => void;
    unsubscribe: any;
    dispatchEvent(eventName: string, cb?: Function): any;
    dispatchEventAll(cb?: Function): any;
}
