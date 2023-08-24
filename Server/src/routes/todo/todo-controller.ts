import { Todo } from "../../models/todo";
import { CrudController } from "../crud-controller";
import { TodoService } from "../../services/todo-service";

export class TodoController extends CrudController<TodoService, Todo> {
  constructor() {
    super(new TodoService());
  }
}

export default new TodoController();
