import IHttpPromiseCallbackArg = angular.IHttpPromiseCallbackArg;
import IPromise = angular.IPromise;
import IRequestShortcutConfig = angular.IRequestShortcutConfig;
import {PromiseRejectionHandler} from "../../promises/PromiseRejectionHandler";

export class PromiseUtils {

    public static wrapSingle<T>(httpPromise:IPromise<IHttpPromiseCallbackArg<T>>, rejectionHandler:PromiseRejectionHandler):Promise<T> {
        return PromiseUtils.wrapSingleAndTransform(httpPromise, rejectionHandler, x => x);
    }

    public static wrapSingleAndTransform<T,I>(httpPromise:IPromise<IHttpPromiseCallbackArg<I>>,
                                              rejectionHandler:PromiseRejectionHandler,
                                              transform: (I) => T):Promise<T> {
        return rejectionHandler.monitor(new Promise<T>((resolve, reject) => {
            httpPromise
                .then((response:IHttpPromiseCallbackArg<I>) => resolve(transform(response.data)))
                .catch((reason:IHttpPromiseCallbackArg<T>) => reject(reason.status));
        }));
    }

    public static wrapMultiple<T>(httpPromises:IPromise<IHttpPromiseCallbackArg<T>>[], rejectionHandler:PromiseRejectionHandler):Promise<T[]> {
        return rejectionHandler.monitor(new Promise<T[]>((resolve, reject) => {
            Promise.all(httpPromises)
                .then((responses:IHttpPromiseCallbackArg<T>[])=> resolve(responses.map(response => response.data)))
                .catch((reasons:IHttpPromiseCallbackArg<T>[]) => reject(reasons[0].status));
        }));
    }

    public static wrapData<T>(data:T):IRequestShortcutConfig {
        return {
            data: data,
            headers: {"Content-Type": "application/json"}
        }
    }

    public static resolveMultiple<T>(promises:Promise<T>[]):Promise<T[]> {
        return new Promise((resolve:(results:T[])=>void, reject:(reason:number)=>void) => {
            Promise.all(promises)
                .then((results:T[]) => resolve(results))
                .catch((reason:number) => reject(reason));
        });
    }

}
