import React from 'react';
import Todo from './Todo'

/* TODO LIST ITEM CONTAINER */

export default function List(props) {

  // Passing todo item props to individual item

  return (
    <div className='list-container'>
      {props.todoList.map(todo => (
        <Todo 
          text={todo.text}
          key={todo.id}
          id={todo.id}
          completed={todo.completed}
          priority={todo.priority}
          count={todo.count}
          todoList={props.todoList}
          setTodoList={props.setTodoList}
        />
      ))}
    </div>
  )
}

