import { useState } from "react";
import "./Post.css";
import PostDetail from "./PostDetail";
import { useDispatch } from "react-redux";
import { selectMyPost, selectOtherPost } from "../../store/posts";
import { useLocation } from "react-router-dom";
import { Spinner } from "reactstrap";
import { selectUserById } from "../../store/users";
import { deletePost } from "../../store/posts";
const Post = ({ posts, postState }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [postUser, setPostUser] = useState();
  const [clickPost, setClickPost] = useState();
  const dispatch = useDispatch();
  const location = useLocation();
  const openModal = (post) => {
    dispatch(selectUserById(post.userId))
      .unwrap()
      .then((result) => {
        setPostUser(result);
      })
      .finally(() => {
        setClickPost(post);
        setIsOpen(true);
      });
  };
  const closeModal = () => {
    setClickPost();
    setIsOpen(false);
  };

  const onClickDelete = (postId) => {
    dispatch(deletePost(postId));
    dispatch(
      location.pathname === "/profile" ? selectMyPost() : selectOtherPost()
    );
    setIsOpen(false);
  };

  return (
    <div className="Posts">
      {postState.loading ? (
        <Spinner>Loading...</Spinner>
      ) : (
        posts?.map((data) => (
          <div className="PostsImgBox" onClick={() => openModal(data)}>
            <img
              className="PostsImg"
              key={data.id}
              src={data.img}
              alt={data.content}
            ></img>
          </div>
        ))
      )}
      {clickPost ? (
        <PostDetail
          isOpen={isOpen}
          clickPost={clickPost}
          closeModal={closeModal}
          onClickDelete={onClickDelete}
          user={postUser}
        ></PostDetail>
      ) : null}
    </div>
  );
};
export default Post;
