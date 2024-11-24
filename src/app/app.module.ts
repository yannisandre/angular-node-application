import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { DefaultService } from '../generated';

@NgModule({

  imports: [
    BrowserModule,
    HttpClientModule,
  ],

  declarations: [
    AppComponent,
    TodoComponent,
  ],

  providers: [DefaultService],
  bootstrap: [AppComponent],
})
export class AppModule {}
