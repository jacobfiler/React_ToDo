import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {ToDoBanner} from "./ToDoBanner"
import {ToDoRow} from "./ToDoRow"
import {ToDoCreator} from "./ToDoCreator";
import {VisabilityControl} from "./VisibilityControl";

export default class App extends Component{
  // Above we have created a class called App that extends the functionality of the Compoonent Class.

  //The export keyword makes the class available for use outside of the JS file where it is created  (like the access modifier in C#)
constructor()
{
  //  We are going to create state data for our component. TO do that, we need to create a constructor method. This method will get called when an object is created using this class. Said another way, this method will be called when the component is initialized.

  // To ensure that we have all the necessary features from REact to create a stateful component, we need to call a method super(). This super() calls the constructor for teh Component class in react.
  super();

  this.state = {
    userName:  "Jacob",
    todoItems: [
      {action: "Mow", done: false},
      {action: "Replace Porch Light", done: false},
      {action: "Install Kitchen Light", done: false},
      {action: "Stain Deck", done: false},
      {action: "Repair Fridge", done: true}
    ]
  }

} //end of constructor

  //  If the ToDoRow Component's "done" property experiences a change eveent (checking the done box in the UI), then the ToDoRow component calls a Callback method called toggleTodo (below) and passes toggleTodo the checked todo item
  todoTableRows = (isTaskDone) => this.state.todoItems.filter(x => x.done === isTaskDone).map(notCompleted => <ToDoRow 
    key = {notCompleted.action}
    item = {notCompleted}
    callback = {this.toggleTodo}
  />)

  //  The toggleTodo method is invoked as a  callback when the ToDoRow component hasa change event to the "done" property
  //.setState allows the data to be updated 
  toggleTodo = (todo) => this.setState({
    todoItems: this.state.todoItems.map(item => item.action === todo.action ? {...item, done: !item.done} : item)
  });

  //  Method below is the callback for the ToDoCreator componenet
  createNewTodoCallback = (newTask) => {
    if (!this.state.todoItems.find(x => x.action === this.state.newItemText)) {
      this.setState({
        //  The spread operator {...} below expands the array of todoItems and adds the new item to the array
        todoItems: [...this.state.todoItems, {action: newTask, done: false}]
      },
      () => localStorage.setItem("todos", JSON.stringify(this.state))//end setitem
      );// end of setstate
    }
  }

//  The method below is a built in React method to handle logic for when the app "mounts" or "loads"
componentDidMount = () => {
  let data = localStorage.getItem("todos");
  this.setState(data != null ? JSON.parse(data) : {
    userName: "Ted",
    todoItems: [
      {action: "Go Fishing", done: false},
      {action: "Go Hunting", done: false},
      {action: "Go Sailing", done: false}
    ],
    showCompleted: true
  })
}


  //when using fat arrow (lambda) syntax the return keyword is not needed and the curly braces (scope) around the body of the function is also not needed.
  render = () => 
    <div>
      <ToDoBanner 
        displayName = {this.state.userName}
        tasks = {this.state.todoItems}
      />
      {/*This is feature 5*/}
      <ToDoCreator
        callback = {this.createNewTodoCallback}
      />

      <div className="col-md-8 offset-md-2">
        <table className="table table-striped table-bordered drop-shadow">
          <thead>
            <tr>
              <th>Description</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>
            {this.todoTableRows(false)}
          </tbody>
        </table>
        <div className = "bg-secondary text-white text-center p-2">
          <VisabilityControl 
            description="Completed Tasks"
            isChecked={this.state.showCompleted}
            callback={checked => this.setState({
              showCompleted: checked
            })}
          />
        </div>
        {this.state.showCompleted &&
        <table className="table table-striped table-bordered drop-shadow">
          <thead>
            <tr>
              <th>Description</th>
              <th>ReAdd</th>
            </tr>
          </thead>
          <tbody>
            {this.todoTableRows(true)}
          </tbody>
        </table>
        }
        </div>
    </div>
};//end of app component


