import {TodoService} from "../../../../../rm/services/TodoService";

export class TodosController {

    constructor(
        public $scope: ng.IScope,
        public todoService: TodoService) { }

}
