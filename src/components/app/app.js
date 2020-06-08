import React, { Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ]
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    };
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id);
      const before = todoData.slice(0, index);
      const after = todoData.slice(index + 1);
      const updatedArr = [...before, ...after];
      return {
        todoData: updatedArr
      };
    });
  };

  addItem = (text) => {
    if(text === '') {
      return;
    }
    const newItem =  this.createTodoItem(text);
    this.setState(({ todoData }) => {
      const newArray = [
        ...todoData,
        newItem
      ];
      return {
        todoData: newArray
      };
    });
  };

  toggleProperty(arr, id, propertyName) {
    const index = arr.findIndex((el) => el.id === id);
      const oldItem = arr[index];
      const newItem = { ...oldItem, [propertyName]: !oldItem[propertyName] };
      const before = arr.slice(0, index);
      const after = arr.slice(index + 1);
      return [...before, newItem, ...after];
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    });
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    });  };

  render() {
    const { todoData } = this.state;
    const doneElementsCount = todoData.filter((el) => el.done).length;
    const todoElementsCount = todoData.length - doneElementsCount;
    return (
       <div className="todo-app">
          <AppHeader toDo={todoElementsCount} done={doneElementsCount} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
        <TodoList todos={ todoData }
                  onDeleted={ this.deleteItem }
                  onToggleImportant={ this.onToggleImportant }
                  onToggleDone={ this.onToggleDone } />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
}