import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Modal } from "reactstrap";
import {
  deleteFollow,
  insertFollowing,
  selectMyFollowingOne,
} from "../../store/follows";
import "./PostDetail.css";

const PostDetail = ({ isOpen, clickPost, closeModal, onClickDelete, user }) => {
  const myId = Number(useSelector((state) => state.users.myId));
  const dispatch = useDispatch();
  const [isMyFollwing, setMyfollowing] = useState(false);
  const postFollowData = () => {
    dispatch(selectMyFollowingOne(user.id))
      .unwrap()
      .then((res) => {
        setMyfollowing(res);
      });
  };
  useEffect(() => {
    postFollowData();
  }, [user]);

  const unFollow = async () => {
    await dispatch(deleteFollow(user.id));
    //await setMyfollowing(false);
    await postFollowData();
  };
  const follow = async () => {
    await dispatch(insertFollowing(user.id));
    //await setMyfollowing(true);
    await postFollowData();
  };
  return (
    <Modal isOpen={isOpen} fullscreen toggle={closeModal}>
      <div className="PostsModalHeader">
        <div>
          <Button close onClick={closeModal}></Button>{" "}
        </div>
        <div>
          {user.name}
          <strong>게시물</strong>
        </div>
        <div>
          {user.id === myId ? (
            <Button color="danger" onClick={() => onClickDelete(clickPost.id)}>
              삭제하기
            </Button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <Container>
        <div className="PostsBody">
          <div className="PostsBodyHeader">
            <div className="PostsBodyHeaderImgBox">
              <img
                className="PostsBodyHeaderImg"
                src={user.img}
                alt="userImg"
              ></img>
            </div>
            {user.name}
            {user.id === myId ? (
              <></>
            ) : !isMyFollwing ? (
              <Button onClick={follow} outline>
                팔로우
              </Button>
            ) : (
              <Button onClick={unFollow} outline>
                언팔로우
              </Button>
            )}
          </div>
          <img
            className="PostsBodyImg"
            src={clickPost?.img}
            alt="postimg"
          ></img>
          <p>{clickPost?.content}</p>
        </div>
      </Container>
    </Modal>
  );
};

export default PostDetail;
