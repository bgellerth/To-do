import TodoModel, { Todo } from "../models/todo";
import { CrudService } from "./crud-service";

export class TodoService extends CrudService<Todo> {
  constructor() {
    super(TodoModel);
  }
}
