import {RmTodosController} from "./RmTodosController";

export class RmTodosDirective {

    constructor() {
        return {
            bindToController: true,
            controller: [
                'TodoService',
                '$scope',
                RmTodosController
            ],
            controllerAs: 'todosList',
            replace: true,
            restrict: 'E',
            scope: {},
            templateUrl: '/layout/rm-todos/rm-todos.html'
        };
    }

}
