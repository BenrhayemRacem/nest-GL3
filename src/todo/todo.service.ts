import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from '../entities/todo';
import { v4 as uuid4 } from 'uuid';
import {
  CreateTodoDTO,
  FindTodoResponseDTO,
  UpdateTodoDTO,
} from '../todo/dto/todoDto';

@Injectable()
export class TodoService {
  constructor() {
    this.todos = [];
  }
  private todos: Todo[];

  getTodoById(todoId: string): FindTodoResponseDTO {
    const response = this.todos.find((todo) => {
      return todo.id === todoId;
    });
    if (!response) {
      throw new NotFoundException();
    }
    return response;
  }

  deleteTodoById(todoId: string): string {
    const response = this.todos.find((todo) => todo.id === todoId);
    if (!response) {
      throw new NotFoundException();
    }
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
    return todoId;
  }

  updateTodoById(params, todoId: string): UpdateTodoDTO {
    const response = this.todos.find((todo) => todoId === todo.id);
    if (!response) {
      throw new NotFoundException();
    }
    const updatedTodo = { ...response, ...params };

    return updatedTodo;
  }

  getTodos(): FindTodoResponseDTO[] {
    return this.todos;
  }

  addTodo(body: Todo): CreateTodoDTO {
    let newTodo = new Todo();
    newTodo.id = uuid4();
    newTodo = { ...newTodo, ...body };

    this.todos.push(newTodo);

    return newTodo;
  }
}
