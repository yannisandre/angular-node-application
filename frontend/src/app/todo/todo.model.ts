export interface TodoDTO {
  id: number;
  title: string;
}

export class TodoModel {
  constructor(public id: number, public title: string) {}
}
