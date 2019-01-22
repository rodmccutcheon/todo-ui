import {Func} from "../delegates/Delegates";

export class PromiseRejectionHandler {

    constructor(
        private handleError: Func<number, boolean>
    ) {}

    public monitor<T>(promise: Promise<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            promise
                .then(result => resolve(result))
                .catch(reason => {
                    if (!this.handleError(reason)) {
                        reject(reason);
                    }
                });
        });
    }

}