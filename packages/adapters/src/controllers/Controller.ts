import {Presenter, Subscriber} from "../presenters/Presenter";

export abstract class Controller<T> {
    private abstractPresenter: Presenter<T>;

    protected constructor(abstractPresenter: Presenter<T>) {
        this.abstractPresenter = abstractPresenter;
    }

    subscribeVM(subscriber: Subscriber<T>) {
        this.abstractPresenter.subscribeVM(subscriber)
    }

    get vm() {
        return this.abstractPresenter.vm
    }
}
