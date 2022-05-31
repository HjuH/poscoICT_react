import { useContext } from 'react';
import { Container } from 'reactstrap';
import { UserContext } from '../store/UserContext';
import ProfileHeader from './ProfileHeader';
import ProfileBody from './ProfileBody';
import { PostContext } from '../store/PostContext';
import { FollowContext } from '../store/FollowContext';

const Profile = () => {
    const { users } = useContext(UserContext);
    const id = Number(localStorage.getItem('id'));
    const getUser = () => {
        return users.find((user) => id === user.id);
    };
    const { name, img } = getUser();
    const { posts } = useContext(PostContext);
    const { follows } = useContext(FollowContext);

    const myPosts = () => {
        return posts.filter((post) => post.userId === id);
    };
    const myFollwer = () => {
        return follows.filter((follow) => follow.following === id);
    };
    const myFollowing = () => {
        return follows.filter((follow) => follow.follower === id);
    };

    return (
        <>
            <ProfileHeader name={name}></ProfileHeader>
            <Container className="ProfileContainer">
                <ProfileBody img={img} follower={myFollwer()} following={myFollowing()} posts={myPosts()}></ProfileBody>
            </Container>
        </>
    );
};

export default Profile;
