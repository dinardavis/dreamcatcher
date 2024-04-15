import WidgetWrapper from 'components/WidgetWrapper'
import React from 'react'
import { BsTrash } from "react-icons/bs"
import { BsCheck2Square } from "react-icons/bs"

/* STRUCTURE OF INDIVIDUAL TODO ITEMS */

export default function Todo(props) {
  const listStyles = {
    textDecoration: props.completed ? "line-through" : "none"
  }

  const checkmarkStyles = {
    color: props.completed ? "#f41e1e" : "#d0d0d0"
  }

  let bgPriorityColor = "Low"
  let borderPriorityColor = 'Low'

  if(props.priority[props.count] === 'Low') {
    bgPriorityColor = '#00accb'
    borderPriorityColor = '1.5px solid #00accb'
  } else if(props.priority[props.count] === 'Medium') {
    bgPriorityColor = '#e6ab3e'
    borderPriorityColor = '1.5px solid #e6ab3e'
  } else if(props.priority[props.count] === 'High') {
    bgPriorityColor = '#f41e1e'
    borderPriorityColor = '1.5px solid #f41e1e'
  }

  const priorityStyles = {
    backgroundColor: bgPriorityColor,
    border: borderPriorityColor,
  }

  // Add list item priority levels

  function setPriorityLevel(id) {
    props.setTodoList(prevList => prevList.map(item => {
      if(item.id === id && item.count === 2) {
        return {...item, count: 0}
      }
      return item.id === id ? 
        {...item, count: item.count + 1} :
        item
    }))
  }

  // Add completed item toggle 

  function markCompleted(id){
    props.setTodoList(prevList => prevList.map(item => {
      return item.id === id ?
      {...item, completed: !item.completed} :
      item
    }))
  }

  // Add delete item functionality

  function deleteTodoItem(id) {
    props.setTodoList(props.todoList.filter(item => {
      return item.id !== id
    }))
  }
  
  return (
    <WidgetWrapper className='todo-list list-item' style={listStyles}>
      <div 
        className='category-marker' 
        style={priorityStyles}
        title={`${props.priority[props.count]} Priority`}
        onClick={() => setPriorityLevel(props.id)}
      >
      </div>
      <p className='todo-text'>{props.text}</p>
      <BsCheck2Square 
        className='todo-icon check-icon'
        style={checkmarkStyles}
        onClick={() => markCompleted(props.id)}
      />
      <BsTrash 
        className='todo-icon trash-icon'
        onClick={() => deleteTodoItem(props.id)}  
      />
    </WidgetWrapper>
  )
}

