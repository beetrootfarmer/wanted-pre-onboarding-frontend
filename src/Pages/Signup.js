import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';

function Signup() {
  const [email, setEmail] = useState('')
  const [valE, setValE] = useState(true)
  const [password, setPassword] = useState('')
  const [valP, setValP] = useState(true)
  const [formValid, setFormValid] = useState(false)
  const navigate = useNavigate()

  const checkEmail = (email) =>{
    if (email.indexOf('@') !== -1){
      setValE(true)
    } else{
      setValE(false)
    }
  }

  const checkPassword = (password) => {
    if (password.length < 8){
      setValP(false)
    } else {
      setValP(true)
    }
  }

  useEffect(()=>{
    if (localStorage.getItem('access_token')){
      navigate('/todo')
    }
   })

  useEffect(() => {
    if ( valE && valP && email !== "" && password !== ""){
      setFormValid(true)
    } 
  },[valE, valP, email, password])

  const handleSignup = async (event) => {
    event.preventDefault();
      axios.post('https://www.pre-onboarding-selection-task.shop/auth/signup',
      {
        email,
        password
      }).then((res) =>{
        if (res.status == '201'){
          alert('환영합니다!')
          navigate('/signin')
        }
      }).catch((err) => {
        if (err.response.data.message === "동일한 이메일이 이미 존재합니다.") {
          alert('이미 존재하는 이메일입니다!')
        }
      })
  }

    return (
      <div className="Signup">
          <h1 className='pageTitle'>회원가입</h1>
          <form>
            <input 
              type="email" 
              className="inputBox" 
              data-testid="email-input"
              // placeholder="youare@wanted.co.kr"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                checkEmail(e.target.value)
              }}
              required
            />
            {valE ? <></> :
              <p>유효하지 않은 이메일형식입니다.</p>  
            }
            <p></p>
            <input data-testid="password-input" 
              type="password"
              className="inputBox"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                checkPassword(e.target.value)
              }}
            />
            {valP ? <></> :
              <p>비밀번호는 8자리 이상으로 설정해주세요.</p>  
            }
            <button 
              className='formBtn'
              data-testid="signup-button"
              disabled={!formValid}
              onClick={handleSignup}
              >회원가입</button>
          </form>
      </div>
    );
  }
  export default Signup;



// TODO : 👍 이메일과 비밀번호의 유효성 검사
//   이메일 조건: @ 포함
// 비밀번호 조건: 8자 이상
// 이메일과 비밀번호의 유효성 검사 조건은 별도의 추가 조건 부여 없이 위의 조건대로만 진행해주세요 (e.g. 비밀번호 유효성 검사에 특수문자 포함 등의 새로운 조건을 추가하는 행위, 비밀번호 확인 조건을 추가하는 행위 등은 지양해주세요)
// 입력된 이메일과 비밀번호가 유효성 검사를 통과하지 못한다면 button에 disabled 속성을 부여해주세요

// 보안 상 실제 사용하고 계신 이메일과 패스워드말고 테스트용 이메일, 패스워드 사용을 권장드립니다.
// TODO : 👍 회원가입
// URL: /auth/signup
// Method: POST
// Headers:
// Content-Type: application/json
// Body:
// email: string
// password: string
// 응답 예시
// status: 201 Created
// body: 없음
// TODO : 👍 Assignment 2
// 회원가입 페이지에서 버튼을 클릭 시 회원가입을 진행하고 회원가입이 정상적으로 완료되었을 시 /signin 경로로 이동해주세요
  // TODO :👍 추가
  // 이메일 유효성 확인 => 요청 보냈을 때 이미 존재하는 이메일입니다 라는 답이 오면 알림 띄우기