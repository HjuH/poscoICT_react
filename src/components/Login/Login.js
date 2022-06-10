import { Button } from "reactstrap";
import "./Login.css";
const Login = () => {
    <div className="LoginPage">
      <div className="Box">
        <div className="imgBox">
          <img
            src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png"
            alt="img"
          ></img>
        </div>
        <div className="LoginForm">
          <input
            type="text"
            placeholder="전화번호, 사용자 이름 또는 이메일"
          ></input>
          <input type="password" placeholder="비밀번호"></input>
          <Button color="primary">로그인</Button>
        </div>
      </div>
      <div className="Box">
        <p>
          계정이 없으신가요? <a href="/join">가입하기</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
