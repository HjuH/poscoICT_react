import { Modal } from 'reactstrap';
import { Button, Container } from 'reactstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { deleteFollow, insertFollowing, selectMyFollowingOne } from '../store/follows';
import { useEffect } from 'react';
import './PostDetail.css';

const PostDetail = ({ isOpen, clickPost, closeModal, onClickDelete, user }) => {
    const myId = Number(useSelector((state) => state.users.myId));
    const dispatch = useDispatch();
    const [isMyFollowing, setIsMyFollowing] = useState(false);
    const postFollowData = () => {
        dispatch(selectMyFollowingOne(user.id))
            .unwrap()
            .then((res) => {
                setIsMyFollowing(res);
            });
    };
    useEffect(() => {
        postFollowData();
    }, [user]);

    const unFollow = async () => {
        await dispatch(deleteFollow(user.id));
        await postFollowData();
    };
    const follow = async () => {
        await dispatch(insertFollowing(user.id));
        await postFollowData();
    };
    return (
        <Modal isOpen={isOpen} fullscreen toggle={closeModal}>
            <div className="profileBoardModalHeader">
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
                    <div className="PostsBodyHeader">
                        <div className="PostsBodyHeaderImgBox">
                            <img className="PostsdBodyHeaderImg" src={user.img} alt="userImg"></img>
                        </div>
                        {user.name}
                        {user.id === myId ? (
                            <></>
                        ) : !isMyFollowing ? (
                            <Button onClick={follow} outline>
                                팔로우
                            </Button>
                        ) : (
                            <Button onClick={unFollow} outline>
                                언팔로우
                            </Button>
                        )}
                    </div>
                    <img className="PostsBodyImg" src={clickPost?.img} alt="postimg"></img>
                    <p>{clickPost?.content}</p>
                </div>
            </Container>
        </Modal>
    );
};

export default PostDetail;
