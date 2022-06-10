import { useEffect } from "react";
import { Container } from "reactstrap";
import ProfileBody from "./ProfileBody";
import ProfileHeader from "./ProfileHeader";
import "./Profile.css";
import Post from "../Posts/Post";
import { useSelector, useDispatch } from "react-redux";
import { selectMyPost } from "../../store/posts";
import { selectMyFollower, selectMyFollowing } from "../../store/follows";
const Profile = () => {
  const { name, img, id } = useSelector((state) => state.users.me);
  const myPosts = useSelector((state) => state.posts.myPosts);
  const posts = useSelector((state) => state.posts.posts);
  const follower = useSelector((state) => state.follows.myFollower);
  const following = useSelector((state) => state.follows.myFollowing);

  const dispatch = useDispatch();

  const myFollower = () => {
    dispatch(selectMyFollower());
    //return follows.filter((follow) => follow.following === id);
  };
  const myFollowing = () => {
    dispatch(selectMyFollowing());
    //return follows.filter((follow) => follow.follower === id);
  };

  useEffect(() => {
    dispatch(selectMyPost());
    myFollower();
    myFollowing();
  }, [posts]);

  return (
    <>
      <ProfileHeader name={name}></ProfileHeader>
      <Container className="ProfileContainer">
        <ProfileBody
          img={img}
          follower={follower}
          following={following}
          posts={myPosts.posts}
          name={name}
          postState={myPosts}
        ></ProfileBody>
        <Post
          posts={myPosts.posts}
          name={name}
          img={img}
          postState={myPosts}
        ></Post>
      </Container>
    </>
  );
};
export default Profile;
