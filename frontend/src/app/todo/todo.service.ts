import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoDTO, TodoModel } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  httpClient = inject(HttpClient);

  private toDTOs(todoArray: TodoDTO[]): TodoModel[] {
    return todoArray.map((x) => new TodoModel(x.id, x.title));
  }

  getTodos(): Observable<TodoModel[]> {
    return this.httpClient.get<TodoDTO[]>('/api/todos').pipe(
      map((todoArray) => this.toDTOs(todoArray))
    );
  }
}
