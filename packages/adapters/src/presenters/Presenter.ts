export type Subscriber<T> = (vm: T) => void;

export abstract class Presenter<T> {

    public vm: T;
    protected subscriber: Subscriber<T> | undefined;

    protected constructor(vm: T) {
        this.vm = vm;
    }

    notifyVM() {
        this.subscriber?.call(this.subscriber, this.vm)
    }

    subscribeVM(subscriber: Subscriber<T>) {
        this.subscriber = subscriber
        this.subscriber(this.vm)
    }
}
