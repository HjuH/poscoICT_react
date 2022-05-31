import { useContext, useState } from 'react';
import { Button, Col, Container, Form, Input, Row, Alert } from 'reactstrap';
import './Join.css';
import { useNavigate } from 'react-router';
import AuthRouter from '../AuthRouter';
import { UserContext } from '../../store/UserContext';
import { Link } from 'react-router-dom';

const Join = () => {
    const [isFail, setIsFail] = useState(false);
    const [text, setText] = useState('');
    const [user, setUser] = useState({
        id: '',
        password: '',
        name: '',
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const navigate = useNavigate();
    const { insertUsers, users } = useContext(UserContext);

    const onSubmitJoin = (e) => {
        e.preventDefault();
        const findUser = users.find((data) => data.userId === user.id);
        if (findUser) {
            openAlert('이미 존재하는 아이디 입니다.');
            return;
        } else if (user.id === '') {
            openAlert('아이디를 입력해주세요.');
            return;
        } else if (user.password === '') {
            openAlert('비밀번호를 입력해주세요.');
            return;
        } else if (user.name === '') {
            openAlert('이름을 입력해주세요.');
            return;
        } else {
            insertUsers(user);
            localStorage.setItem('id', users.length);
            navigate('/');
        }
    };

    const openAlert = (text) => {
        setIsFail(true);
        setText(text);
        setTimeout(() => closeAlert(), 3000);
    };

    const closeAlert = () => {
        setIsFail(false);
        setText('');
    };

    return (
        <div className="JoinPage">
            <Container className="bg-light border">
                <Row style={{ rowGap: '1em', padding: '3em' }}>
                    <Col xl={12}>
                        <img src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" alt="Logo"></img>
                    </Col>

                    <Col xl={12}>
                        <Form onSubmit={onSubmitJoin} className="JoinForm">
                            {isFail ? (
                                <Alert color="warning" toggle={() => closeAlert}>
                                    {text}
                                </Alert>
                            ) : null}
                            <Input type="text" placeholder="Id" name="id" onChange={(e) => onChangeHandler(e)}></Input>
                            <Input type="password" placeholder="Password" name="password" onChange={(e) => onChangeHandler(e)}></Input>
                            <Input type="text" placeholder="name" name="name" onChange={(e) => onChangeHandler(e)}></Input>
                            <Button type={'submit'} color="primary" block>
                                가입
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>

            <Container className="bg-light border">
                <Row style={{ padding: '1em', textAlign: 'center' }}>
                    <p>
                        계정이 있으신가요? <Link to={'/login'}>로그인</Link>
                    </p>
                </Row>
            </Container>

            <AuthRouter></AuthRouter>
        </div>
    );
};

export default Join;
