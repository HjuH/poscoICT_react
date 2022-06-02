import { useContext, useEffect } from 'react';
import { Container } from 'reactstrap';
import ProfileHeader from './ProfileHeader';
import ProfileBody from './ProfileBody';
import './Profile.css';
import { FollowContext } from '../store/FollowContext';
import Posts from '../Posts/Posts';
import { useDispatch, useSelector } from 'react-redux';
import { selectMyPost } from '../store/posts';

const Profile = () => {
    const { name, img, id } = useSelector((state) => state.users.me);
    const myPosts = useSelector((state) => state.posts.myPosts);
    const { follows } = useContext(FollowContext);
    const dispatch = useDispatch();
    const getMyPost = () => {
        dispatch(selectMyPost());
    };
    useEffect(() => {
        getMyPost();
    }, []);

    const myFollower = () => {
        return follows.filter((follow) => follow.following === Number(id));
    };
    const myFollowing = () => {
        return follows.filter((follow) => follow.follower === Number(id));
    };

    return (
        <>
            <ProfileHeader name={name}></ProfileHeader>
            <Container className="ProfileContainer">
                <ProfileBody img={img} follower={myFollower()} following={myFollowing()} posts={myPosts.posts} name={name}></ProfileBody>
                <Posts posts={myPosts.posts} name={name} img={img} postState={myPosts}></Posts>
            </Container>
        </>
    );
};

export default Profile;
