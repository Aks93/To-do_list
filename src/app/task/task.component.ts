import { Component, OnInit } from '@angular/core';
import {TaskService} from '../services/task.service';
import {Task} from '../../../Task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
 tasks : Task[];
 title : string;
  constructor(private taskservice: TaskService) {
     this.taskservice.getTasks()
       .subscribe(tasks => {
          console.log(tasks);
          this.tasks = tasks;
       });
   }

  ngOnInit() {
  }
  addTask(event)
  {
  event.preventDefault();
  console.log(this.title);
  var newTask = {
  title:this.title,
  isDone:false
  }

  this.taskservice.addTask(newTask)
  .subscribe(task => {
    this.tasks.push(task);
    this.title='';
  });
  }

  deleteTask(id){
  var tasks = this.tasks;
  this.taskservice.deleteTask(id).subscribe(data => {
  if(data.n==1){
    for(var i=0; i < tasks.length ; i++)
    {
    if(tasks[i]._id == id)
    {
    tasks.splice(i,1);
    }
    }
  }
  });
  }

  /*updateStaus(task)
  {
  var _task = {
  _id:task._id,
  title:task.title,
  isDone:!task.isDone
  };
  this.taskservice.updateStatus(_task).subscribe(data =>{
  task.isDone = !task.isDone;
  console.log(task.isDone);
  });
  }*/

}
