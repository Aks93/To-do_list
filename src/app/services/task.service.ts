import { Injectable } from '@angular/core';
import {Http,Headers, Response} from '@angular/http';
//import 'rxjs/add/operator/map';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:Http) {

    console.log("Task service initialized");
   }

  getTasks()
  {
    return this.http.get('http://localhost:3000/api/tasks')
    .pipe(map(res =>res.json()));
  }

  addTask(newTask)
  {
    console.log(newTask);
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/api/task',JSON.stringify(newTask),{headers:headers})
    .pipe(map(res =>res.json()));
  }

  deleteTask(id)
  {
  return this.http.delete('http://localhost:3000/api/task/'+id)
    .pipe(map(res => res.json()));
  }

  /*updateStatus(task)
  {
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.put('http://localhost:3000/api/task/'+task._id,JSON.stringify(newTask),{headers:headers})
    .pipe(map(res =>res.json()));
  }*/
}
