import "./Header.css";
import { useNavigate, NavLink } from 'react-router-dom';
import { useEffect,useState } from "react";
function Header() {
  const [isUser, setIsUser] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async() =>{
    localStorage.removeItem('access_token')
    alert('잘가요~')
    navigate('/')
  }
  useEffect(() => {
    if ( localStorage.getItem('access_token')) {
      setIsUser(true)
    } else {
      setIsUser(false)
    }
  })
    return (
      <div className="Header">
          <NavLink to="/" className="home"><h1>메인</h1></NavLink>
          <div className="nav">
            {
              isUser?
              <>
                <NavLink to="/todo" className="navBtn">투두</NavLink>
                <div to="/" className="navBtn" onClick={handleLogout}>로그아웃</div>
              </>
              :
              <>
                <NavLink to="/signin" className="navBtn">로그인</NavLink>
                <NavLink to="/signup" className="navBtn">회원가입</NavLink>
              </>
            }
            
          </div>
          
      </div>
    );
  }
  
  export default Header; 
  // TODO : 👍  헤더에서 네비게이션 만들기
  // TODO : 👍 local storage에 회원정보가 있으면 로그인 상태 없으면 로그아웃상태
  // TODO : 👍 로그아웃 (localStorage.removeItem(‘access_token’))