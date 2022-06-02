import { useContext } from 'react';
import { Container } from 'reactstrap';
import { UserContext } from '../store/UserContext';
import ProfileHeader from './ProfileHeader';
import ProfileBody from './ProfileBody';
import './Profile.css';
import { PostContext } from '../store/PostContext';
import { FollowContext } from '../store/FollowContext';
import Posts from '../Posts/Posts';

const Profile = () => {
    const { users } = useContext(UserContext);
    const id = localStorage.getItem('id');
    const getUser = () => {
        return users.find((user) => id === user.id);
    };
    const { name, img } = getUser();
    const { posts } = useContext(PostContext);
    const { follows } = useContext(FollowContext);
    console.log('post : ', posts);

    const myPosts = () => {
        console.log(id);
        return posts.filter((post) => post.userId === Number(id));
    };
    const myFollower = () => {
        return follows.filter((follow) => follow.following === Number(id));
    };
    const myFollowing = () => {
        return follows.filter((follow) => follow.follower === Number(id));
    };
    const { deletePost } = useContext(PostContext);

    return (
        <>
            <ProfileHeader name={name}></ProfileHeader>
            <Container className="ProfileContainer">
                <ProfileBody img={img} follower={myFollower()} following={myFollowing()} posts={myPosts()}></ProfileBody>
                <Posts posts={myPosts()} name={name} img={img} deletePost={deletePost}></Posts>
            </Container>
        </>
    );
};

export default Profile;
