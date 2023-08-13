import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "../css/Todo.css";
import "../css/common.css";

function Todo() {
  const navigate = useNavigate()
  const [todos, setTodos] = useState([1,2,3])
  const [content, setContent] = useState('')
  const [ac, setAc] = useState('')
  const [update, setUpdate] = useState(false)
  const [editMode, setEditMode] = useState('')
  const [editTodo, setEditTodo] = useState('')

  useEffect(()=>{
    if (!localStorage.getItem('access_token')){
      navigate('/signin')
    }
    const access_token = localStorage.getItem('access_token')
    setAc(access_token)
    axios({
      url : 'https://www.pre-onboarding-selection-task.shop/todos',
      method : 'GET',
      headers :{
        Authorization: `Bearer ${access_token}`,
      },
    }).then((res) =>{
          if (res.status == '200'){
            setTodos([...res.data])
          }
        })
   },[update])

   const handleCreate = async (event) => {
    event.preventDefault();
    if (!content) {
      alert('투두를 작성해주세요!')
    } else {
      axios({
        url : 'https://www.pre-onboarding-selection-task.shop/todos',
        method : 'POST',
        headers :{
          'Authorization': `Bearer ${ac}`,
          'Content-Type': 'application/json'
        },
        data :{
          todo : content
        }
      }).then((res) =>{
            if (res.status == '201'){
              setUpdate(!update)
            }
          })
     }
    }
    const handleUpdate = async (id, content, isCompleted,check) => {
      axios({
        url : `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
        method : 'PUT',
        headers :{
          'Authorization': `Bearer ${ac}`,
          'Content-Type': 'application/json'
        },
        data :{
          todo : content,
          isCompleted : check? !isCompleted : isCompleted
        }
      }).then((res) =>{
            if (res.status == '200'){
              setUpdate(!update)
            }
          })

    }

    const handleDelete = async(id, content, isCompleted) =>{
      axios({
        url : `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
        method : 'DELETE',
        headers :{
          'Authorization': `Bearer ${ac}`,
          'Content-Type': 'application/json'
        },
        data :{
          todo : content,
          isCompleted : isCompleted
        }
      }).then((res) =>{
            if (res.status == '204'){
              setUpdate(!update)
            }
          })
    }
    
   
    return (
      <div className="TodoBox">
          <h1>투두~</h1>
          <div className='inputBox'>
            <input 
              className='inputBox'
              data-testid="new-todo-input"
              value={content}
              onChange ={(e) => setContent(e.target.value)}
            />
            <button 
              className='btn'
              data-testid="new-todo-add-button"
              onClick={handleCreate}
            >추가</button>
          </div>
          <div className='todoList'>
            {todos && todos.map((el, i) => {
              return (
                <li className='todo'>
                    
                    {editMode==el.id?
                    <div>
                      <label>
                        <input 
                          type="checkbox" 
                          checked={el.isCompleted} 
                          onChange={()=>handleUpdate(el.id, el.todo, el.isCompleted, true)}/>
                      </label>
                      <input
                        className='inputBox'
                        data-testid="modify-input"
                        value={editTodo}
                        onChange={(e)=>setEditTodo(e.target.value)}
                        />
                        <button 
                          className='btn'
                          data-testid="submit-button"
                          onClick={() => {
                            handleUpdate(el.id, editTodo, el.isCompleted, false)
                            setEditMode(false)
                          }}
                        >제출</button>
                        <button 
                          className='btn'
                          data-testid="cancel-button" 
                          onClick={()=>setEditMode('')}>
                            취소</button>
                    </div>
                    :
                    <div>
                      <label>
                        <input 
                          type="checkbox" 
                          checked={el.isCompleted} 
                          onChange={()=>handleUpdate(el.id, el.todo, el.isCompleted, true)}/>
                        <span>{el.todo}</span>
                      </label>
                      <button
                        className='btn'
                        data-testid="modify-button" 
                        onClick={()=>{
                          setEditMode(el.id)
                          setEditTodo(el.todo)}}>수정</button>
                      <button
                        className='btn'
                        data-testid="delete-button"
                        onClick={()=>handleDelete(el.id, el.todo, el.isCompleted)}
                      >삭제</button>
                    </div>
                  }
                </li>
              )
            })
          }
          </div>
      </div>
    );
  }
  
  export default Todo;
  
// TODO : 👍 Assignment 5 getTodo
// /todo경로에 접속하면 투두 리스트의 목록을 볼 수 있도록 해주세요
// 목록에서는 TODO의 내용과 완료 여부가 표시되어야 합니다.

// TODO : 👍 Assignment 6 CreateTodo
// 리스트 페이지에 새로운 TODO를 입력할 수 있는 input과 추가 button을 만들어주세요
// 추가 button을 클릭하면 입력 input의 내용이 새로운 TODO로 추가되도록 해주세요
// Assignment 7 todo status
// TODO : 👍 의 체크박스를 통해 완료 여부를 수정할 수 있도록 해주세요.

// TODO : 👍 데이터 수정하거나 추가했을 때 바로 반영되지 않는 이슈

//Assignment 8
// TODO 👍우측에 수정버튼과 삭제 버튼을 만들어주세요

//  TODO 👍 Assignment 9
// 투두 리스트의 삭제 기능을 구현해주세요

// TODO 👍 Assignment 10
// 투두 리스트의 수정 기능을 구현해주세요
