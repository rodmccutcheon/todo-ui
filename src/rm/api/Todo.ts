export class Todo {

    constructor(
        public id: number,
        public title: string,
        public completed: boolean = false,
        public timeZone: string
    ) { }

    public static clone(other: Todo): Todo {
        return new Todo(
            other.id,
            other.title,
            other.completed,
            other.timeZone
        );
    }

    public static cloneArray(other: Todo[]): Todo[] {
        return other.map(item => Todo.clone(item));
    }
}