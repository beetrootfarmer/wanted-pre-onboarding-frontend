import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Signin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSignin = async (event) => {
    event.preventDefault();
      axios.post('https://www.pre-onboarding-selection-task.shop/auth/signin',
      {
        email,
        password
      }).then((res) =>{
        if (res.status == '200'){
          alert('환영합니다!')
          let ac = res.data.access_token
          // access_token 로컬스토리지에 저장
          localStorage.setItem("access_token",ac)
          navigate('/todo')
        }
      })
  }

  useEffect(()=>{
   if (localStorage.getItem('access_token')){
     navigate('/todo')
   }
  })
    return (
      <div className="Signin">
          <h1>로그인페이지입니다</h1>
          <form>          
            <input 
              data-testid="email-input" 
              type="email"
              className="inputBox"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            <input 
              data-testid="password-input"
              type="password"
              className="inputBox"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            <button 
              data-testid="signin-button"
              onClick={handleSignin}
            >로그인</button>
          </form>
      </div>
    );
  }
  
  export default Signin;

  // TODO : 👍 Assignment 3 
// 로그인 페이지에서 버튼을 클릭 시, 로그인을 진행하고 로그인이 정상적으로 완료되었을 시 /todo 경로로 이동해주세요

// 로그인 API는 로그인이 성공했을 시 Response Body에 JWT를 포함해서 응답합니다.
// 응답받은 JWT는 로컬 스토리지에 저장해주세요
  

// TODO : 👍 Assignment 4
// 로그인 여부에 따른 리다이렉트 처리를 구현해주세요

// 로컬 스토리지에 토큰이 있는 상태로 /signin 또는 /signup 페이지에 접속한다면 /todo 경로로 리다이렉트 시켜주세요
// 로컬 스토리지에 토큰이 없는 상태로 /todo페이지에 접속한다면 /signin 경로로 리다이렉트 시켜주세요