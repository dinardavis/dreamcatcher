import { InputBase } from '@mui/material';
import React from 'react'

/* FORM CONTAINER WHICH HOLDS TODO LIST*/

export default function Form(props) {

  // Listens for changes to form input field

  function handleChange(e) {
    props.setUserInput(e.target.value)
  }

  // If input field is not empty create todo list object and add to the list

  function addTodoItem(e) {
    e.preventDefault();
    if(props.userInput.length !== 0){
      props.setTodoList([
        {
          text: props.userInput,
          completed: false,
          id: Math.random() * 10000,
          priority: ['Low', 'Medium', 'High'],
          count: 0,
        },
        ...props.todoList, 
        ])
      props.setUserInput("")
    }
  }

  return (
     <form className='form-container'>
      <InputBase
        className='todo-input'
        type="text"
        placeholder="Travel Checklist"
        value={props.userInput}
        onChange={handleChange}
      />
      <button 
        className='todo-add-btn'
        onClick={addTodoItem}
      >+</button>
    </form>
  )
}