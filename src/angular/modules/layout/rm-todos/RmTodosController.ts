import {TodoService} from "../../../../rm/services/TodoService";
import {Todo} from "../../../../rm/api/Todo";

export class RmTodosController {

    public todos: Todo[] = [];

    constructor(private todoService: TodoService,
                private $scope: ng.IScope) {
        this.todoService.getTodos().then(response => {
            console.log(response);
            this.$scope.$apply(() => {
                this.todos = response;
            });
        });
    }

}
