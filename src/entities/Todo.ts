import { TodoStatusEnum } from '../todo/enums/todoStatus.enum' ;

export class Todo {
  constructor(
    public id: string = '',
    public name: string = '',
    public description: string = '',
    public createdAt = new Date(),
    public status: TodoStatusEnum = TodoStatusEnum.waiting,
  ) {}
}
