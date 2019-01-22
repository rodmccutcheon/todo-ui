import {Todo} from "../api/Todo";
import {TodoResource} from "../angular/resources/TodoResource";

export class TodoService {

    constructor(private todoResource: TodoResource) { }

    public getTodos(): Promise<Todo[]> {
        return this.todoResource.retrieveAll();
    }

    // public getTodo(id: number): Promise<Todo> {
    //     return this.resource.retrieve(id);
    // }
    //
    // public addTodo(todo: Todo): Promise<SavedEntity<Todo, number>> {
    //     return this.resource.add(todo);
    // }
    //
    // public deleteTodo(id: number): Promise<{}> {
    //     return this.resource.delete(id);
    // }
    //
    // public updateTag(id: number, todo: Todo): Promise<{}> {
    //     return this.resource.update(id, todo);
    // }
}
