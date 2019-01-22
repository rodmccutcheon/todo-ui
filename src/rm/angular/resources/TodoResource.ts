import {Resource} from "../Resource";
import {Todo} from "../../api/Todo";
import {ITodoResource} from "../../api/ITodoResource";
import {PromiseRejectionHandler} from "../../promises/PromiseRejectionHandler";

export class TodoResource extends Resource<Todo, number> implements ITodoResource {

    constructor(
        $http: ng.IHttpService,
        baseUrl: string,
        rejectionHandler: PromiseRejectionHandler
    ) {
        super($http, baseUrl, rejectionHandler);
    }

}
