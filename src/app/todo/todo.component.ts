import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultService } from '../../generated';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface TodoDTO {
  id: number;
  title: string;
}

interface TodoModel {
  id: number;
  title: string;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  private readonly todoApiService = inject(DefaultService);

  todos$: Observable<TodoModel[]> | undefined; // holding backend datas in an observable

  // mapping dto into model
  private toDTOs(todoArray: TodoDTO[]): TodoModel[] {
    return todoArray.map((x) => ({ id: x.id, title: x.title }));
  }

  // doing api calls when the button is clicked
  onClick(): void {
    this.todos$ = this.todoApiService
      .apiTodosGet() // Fetch TodoDTO[] from the backend
      .pipe(map((todoArray: TodoDTO[]) => this.toDTOs(todoArray))); // Map to TodoModel[]
  }
}
