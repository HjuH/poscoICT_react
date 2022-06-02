import { useContext } from 'react';
import { Button, Container, Modal } from 'reactstrap';
import { UserContext } from '../store/UserContext';
import './PostDetail.css';

const PostDetail = ({ isOpen, clickPost, closeModal, onClickDelete }) => {
    const { users } = useContext(UserContext);
    const getUser = () => {
        return users.find((user) => user.id === clickPost.userId);
    };
    const user = getUser();
    const myId = Number(localStorage.getItem('id'));

    return (
        <Modal isOpen={isOpen} fullscreen toggle={closeModal}>
            <div className="PostsModalHeader">
                <Button close onClick={closeModal}></Button>{' '}
                <div>
                    {user.name}
                    <strong>게시물</strong>
                </div>
                {user.id === myId ? (
                    <Button color="danger" outline onClick={() => onClickDelete(clickPost.id)}>
                        삭제하기
                    </Button>
                ) : (
                    <div></div>
                )}
            </div>
            <Container>
                <div className="PostsBody">
                    <div className="PostsModalHeader">
                        <div className="PostsModalHeaderImgBox">
                            <img className="PostsModalHeaderImg" src={user.img} alt="userImg"></img>
                        </div>
                        {user.name}
                    </div>
                    <img className="PostsBodyImg" src={clickPost?.img} alt="postimg"></img>
                    <p>{clickPost?.content}</p>
                </div>
            </Container>
        </Modal>
    );
};

export default PostDetail;
