import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Spinner } from "reactstrap";
import { selectMyFollower } from "../../store/follows";
import { selectPostMain } from "../../store/posts";
import Post from "../Posts/Post";
import PostDetail from "../Posts/PostDetail";
import "./Main.css";
import MainCard from "./MainCard";
import MainHeader from "./MainHeader";
const Main = () => {
  const mainPosts = useSelector((state) => state.posts.mainPosts);
  const dispatch = useDispatch();
  const followOtherPost = async () => {
    await dispatch(selectMyFollower());
    await dispatch(selectPostMain());
  };
  useEffect(() => {
    followOtherPost();
  }, []);
  return (
    <div>
      <MainHeader></MainHeader>
      <Container>
        {mainPosts.loading ? ( //
          <Spinner>loading...</Spinner>
        ) : (
          mainPosts.posts.map((post) => (
            <MainCard key={post.id} post={post}></MainCard>
          ))
        )}
      </Container>
    </div>
  );
};

export default Main;
