import { useSelector } from 'react-redux';
import { Button, Container, Modal } from 'reactstrap';
import './PostDetail.css';

const PostDetail = ({ isOpen, clickPost, closeModal, onClickDelete, user }) => {
    const myId = useSelector((state) => state.users.myId);

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
