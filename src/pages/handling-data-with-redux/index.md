---
title: How to handle data with redux.
date: 2020-05-31T11:22:25.427Z
description: A simple but powerful how to.
---

When you start learning redux, at first taking a grasp on how it works can be confusing, maybe you come from an object oriented language and you are accostumed using mutation with classes or you just never done anything with ecmascript 6 so you're not used on the new syntax and snippets you see on the web. In this post I'll be doing a basic redux CRUD like (create, read, update, delete) without persisting the data that hopefully will help you understand a little bit how redux works and why it is useful in some cases.

First of lets scaffold a react app using react-create-app

`yarn create react-app crud-todo`

The todo example is the most straight forward thing to do, but feel free to use whatever thing you want, like movies, books etc.. This will not consume an API to keep things simple, an API basically means that we should also add an extra layer for managing side effects but for the scope of this tutorial we will omit that. Lets add the dependencies we're going to use.

`yarn add redux react-redux redux-logger react-router-dom reselect bootstrap`

After that lets create our reducer, with the initial state with some data and the neccesary actions that we will use.

```js
// redux/modules/todos.js
const NEW_TODO = "crud-todo/todos/NEW_TODO";
const EDIT_TODO = "crud-todo/todos/EDIT_TODO";
const DESTROY_TODO = "crud-todo/todos/DESTROY_TODO";

const initialState = {
  todos: [
    {
      id: "1",
      text: "Take the dog for a walk",
    },
    {
      id: "2",
      text: "Finish Homework",
    }
  ]
};

export default function reducer(state = initialState, action = {}) { return state }
```

After that lets create the rootReducer, the store and add the Provider in the App.js file

```js
// redux/rootReducer.js
import { combineReducers } from "redux";
import todosReducer from "./modules/todos";

const rootReducer = combineReducers({
  todosReducer,
});

export default rootReducer;
```

```js
// redux/setupStore.js
import { createStore } from "redux";
import { createLogger } from "redux-logger";

import rootReducer from "./rootReducer";


export default function configureStore(initialState = {}) {
  const middlewares = [];

  if (process.env.NODE_ENV === "development") {
    const logger = createLogger({ collapsed: true });
    middlewares.push(logger);
  }

  return createStore(
    rootReducer,
    initialState,
  );
}
```
```jsx
// App.js
import React from 'react';
import { Provider } from "react-redux";
import setupStore from "./redux/setupStore";
import './App.css';

const store = setupStore();

function App() {
  return (
    <Provider store={store}>
      <h1>Todos</h1>
    </Provider>
  );
}

export default App;
```

Now the boiler is setup, now we are goint to create a basic router to have basic routing for the new and edit todo pages

```jsx
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import TodoList from "../components/TodoList"
import NewTodo from "../components/NewTodo"
import EditTodo from "../components/EditTodo"

export default function AppRouter() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <NavLink className="navbar-brand" to="/">Todo List</NavLink>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <NavLink className="nav-link" to="/new">New Todo</NavLink>
              </li>
            </ul>
          </div>
        </nav>

        <Switch>
          <Route exact path="/">
            <TodoList />
          </Route>
          <Route path="/new">
            <NewTodo />
          </Route>
          <Route path="/edit/:id">
            <EditTodo />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

```

I won't dig to much deeper here but this is mostly taken from the react training [example](https://reacttraining.com/react-router/web/example/basic). We're going to create the todo list component first.

```jsx{39-42}
// components/TodoList.js
import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

function TodoList({ todos }) {
  return (
    <div className="container">
      <h1>Todo List</h1>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Text</th>
            <th scope="col">Created At</th>
            <th scope="col">Updated At</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
        {todos.length > 0 && todos.map(({ id, text, createdAt, updatedAt }) => {
          return (
            <tr key={id}>
              <th scope="row">{text}</th>
              <td>{createdAt.toISOString()}</td>
              <td>{updatedAt.toISOString()}</td>
              <td>
                <Link className="btn btn-link" to={`edit/${id}`}>Edit</Link>
                /
                <button className="btn btn-link" onClick={() => {}}>Delete</button>
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  );
}

const mapStateToProps = state => ({
  todos: state.todosReducer.todos,
});

export default connect(mapStateToProps)(TodoList);
```

This component is connected to the store and we are grabbing the todos from redux and just iterating them if the todos length is more than 0. Also we added a link to edit the existing todo. Let's create the todo form, which will be a reusable component between the edit and new actions.

```jsx
// components/TodoForm.js
import React, { useState } from 'react';


function TodoForm(props) {
  const { todo, action } = props;
  const [text, setText] = useState( todo.text ?  todo.text : "");

  const onSubmit = (event) => {
    event.preventDefault();
    action(todo.id ? { id: todo.id, text } : { text })
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <input className="form-control"
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
      </div>
      <input
        type="submit"
        className="btn btn-success"
      />
    </form>
  );
}

export default TodoForm;
```

This dummy component receives a todo if applicable (edit action) and an action creator that will be the one who will dispatch the action to redux.

Lets add the new todo component.

```jsx
import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TodoForm from './TodoForm';
import { newTodo } from '../redux/modules/todos';

function NewTodo({ newAction }) {
  return (
    <div className="container">
      <h1>New Todo</h1>
      <TodoForm action={newAction} todo={{}} />
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      newAction: newTodo,
    },
    dispatch,
  );
};

export default connect(null, mapDispatchToProps)(NewTodo);
```

As you can see the component is pretty simple, it connects to redux to have the action creator that will dispatch the newAction method with the new todo.

Let's edit our todos duck to add the new action.

```js
// New required import to generate unique ids
import { v4 as uuidv4 } from 'uuid';
// rest of the code untouched

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case NEW_TODO:
      const newTodo = { id: uuidv4(), text: action.text, createdAt: new Date(), updatedAt: new Date() }
      return {
        ...state,
        todos: [...state.todos, newTodo]
      }
    default:
      return state
  }
}

export function newTodo({ text }) {
  return { type: NEW_TODO, text };
}
```

Ok so the idea here is simple, we are passing the newTodo function that receives an object with a text attribute, and dispatches the `NEW_TODO` action, that will go to the reducer to the `NEW_TODO` case, this will grab the text that we passed to that function and create a new todo that will be added to the current todos array in a **non mutable** way.

In redux we should NOT mutate the state, that means that in our reducer we need to make sure that we're not modifying the current state object, this means that we should create copies of the current state and edit them instead, es6 provides us the spread operator and in this case what we're doing is creating a copy of the current state.todos values and returning a new array with those values and the newTodo `[...state.todos, newTodo]`. Don't use methods that modify the existing array, like `Array.prototype.push` this is not the right way to do it and you will encounter bugs related to it.

Now lets create our edit component, it is pretty much the same as the new todo component but this should actually pass the current todo selected.

For this we are going to use a redux selector

```jsx{18-24}
// components/EditTodo.js
import React from 'react';
import TodoForm from './TodoForm';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from 'react-router-dom';
import { getTodoById, editTodo } from '../redux/modules/todos';

function EditTodo({ todo, editAction }) {
  return (
    <div className="container">
      <h1>Edit Todo</h1>
      <TodoForm action={editAction} todo={todo} />
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  const { params } = ownProps.match;
  const { id } = params;

  // search for the todo associated to this id.
  return { todo: getTodoById(state, id) }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      editAction: editTodo,
    },
    dispatch,
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditTodo));
```

This component has the mapStateToProps function but is not the usual way that you would write a mapState. According to the redux docs, mapStateToProps, also takes an optional second argument, which we're calling ownProps(it can be called whatever you want but that's how the docs called it), ownProps uses the props that are passed to the component, by yourself or by using another HOC, like in this case (we're using the **withRouter** wrapper). Basically this component is connected to the router and redux, thus we will have available the match prop, that comes from the router in the mapStateToProps method, this means that we can use that unique id to go to the redux state and search for the object with that id. The getTodoById is a selector that does the logic for that.

```js{29-30, 32-35}
import { createSelector } from "reselect";

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // rest of the code
    case EDIT_TODO:
      const { editedTodo } = action;
      const editedTodos = state.todos.map((todo) => {
        if (todo.id === editedTodo.id) {
          return (
            { ...todo, text: editedTodo.text, updatedAt: new Date() }
          )
        }
        return ({ ...todo })
      })
      return {
        ...state,
        todos: editedTodos
      }
    default:
      return state
  }
}

export function editTodo(editedTodo) {
  return { type: EDIT_TODO, editedTodo };
}

const getTodo = (state, id) =>
  state.todosReducer.todos.find(todo => id === todo.id);

export const getTodoById = createSelector(
  [getTodo],
  todo => todo,
);
```

The edit todo works pretty much the same as the new todo but instead of adding an item to the existing array it is creating a new copy of the existing array and modifying the item that matches with the `editedTodo` that we passed in the action. Pretty neat right. The selector is last highlighted part in the code that basically takes the state todos and finds the item that matches with the id that we are passing in, in this case is the one that we get by using the ownProps method.

The edit should be working correctly, now let's add a component for the edit form that is going to show the current to do item.

```jsx
// components/ShowTodo.js
import React from 'react';

function ShowTodo({ todo }) {
  const { id, text, createdAt, updatedAt } = todo;
  return (
    <div className="card mb-2">
      <h5 className="card-header">Todo Item {id}</h5>
      <div className="card-body">
        <h5 className="card-title">{text}</h5>
        <p>Created At: {createdAt.toISOString()}</p>
        <p>Updated At: {updatedAt.toISOString()}</p>
      </div>
    </div>
  );
}

export default ShowTodo;
```

Don't forget to add this new component on the EditTodo component. Last but not least lets implement the delete functionality, this is going to be achieved by modifying our delete button that is on the TodoList component, and we're going to pass an action creator for it.

```jsx{28, 39-46}
// New imports needed
import { bindActionCreators } from "redux"
import { destroyTodo } from '../redux/modules/todos';

function TodoList({ destroyAction, todos }) {
  return (
    <div className="container">
      <h1>Todo List</h1>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Text</th>
            <th scope="col">Created At</th>
            <th scope="col">Updated At</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
        {todos.length > 0 && todos.map(({ id, text, createdAt, updatedAt }) => {
          return (
            <tr key={id}>
              <th scope="row">{text}</th>
              <td>{createdAt.toISOString()}</td>
              <td>{updatedAt.toISOString()}</td>
              <td>
                <Link className="btn btn-link" to={`edit/${id}`}>Edit</Link>
                /
                <button className="btn btn-link" onClick={() => destroyAction(id)}>Delete</button>
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      destroyAction: destroyTodo,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
```

And our reducer needs the new action type case in order to make it work. This is the final reducer shape.

```js{47-53, 67-69}
import { createSelector } from "reselect";
import { v4 as uuidv4 } from 'uuid';

const NEW_TODO = "crud-todo/todos/NEW_TODO";
const EDIT_TODO = "crud-todo/todos/EDIT_TODO";
const DESTROY_TODO = "crud-todo/todos/DESTROY_TODO";

const initialState = {
  todos: [
    {
      id: "1",
      text: "Take the dog for a walk",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      text: "Finish Homework",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case NEW_TODO:
      const newTodo = { id: uuidv4(), text: action.text, createdAt: new Date(), updatedAt: new Date() }
      return {
        ...state,
        todos: [...state.todos, newTodo]
      }
    case EDIT_TODO:
      const { editedTodo } = action;
      const editedTodos = state.todos.map((todo) => {
        if (todo.id === editedTodo.id) {
          return (
            { ...todo, text: editedTodo.text, updatedAt: new Date() }
          )
        }
        return ({ ...todo })
      })
      return {
        ...state,
        todos: editedTodos
      }
    case DESTROY_TODO:
      const { id } = action;
      const newTodos = state.todos.filter(todo => todo.id !== id);
      return {
        ...state,
        todos: newTodos
      }
    default:
      return state
  }
}

export function newTodo({ text }) {
  return { type: NEW_TODO, text };
}

export function editTodo(editedTodo) {
  return { type: EDIT_TODO, editedTodo };
}

export function destroyTodo(id) {
  return { type: DESTROY_TODO, id };
}

const getTodo = (state, id) =>
  state.todosReducer.todos.find(todo => id === todo.id);

export const getTodoById = createSelector(
  [getTodo],
  todo => todo,
);
```

Basically the destryo todo action will filter the items that match with the passed id, in this case the id is unique so it will exclude them from the new array. Filter returns a new array so you should not worry because it will not modify the existing one.

And this is it, as you can see this is not so complex, is basically dealing with data structures and returning new values everytime we dispatch an action. This is the redux way to modify a list(array), in case you want to hook this to an API, the methodology should be the same, you jsut need a nice middleware that can handle all your side effects(api requests) and maybe a few actions to deal with the responses received, because we can't get status errors or maybe a wrong response, so we should also handle that. I might do a tutorial later, but I wanted this one to be pretty simple.
