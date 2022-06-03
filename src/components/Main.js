import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Spinner, Card } from 'reactstrap';
import AuthRouter from './AuthRouter';
import { selectMyFollower } from './store/follows';
import PostsAdd from './Posts/PostsAdd';
import { selectPostMain } from './store/posts';
import './Main.css';

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
                {mainPosts.loading ? (
                    <Spinner>loading...</Spinner>
                ) : (
                    mainPosts.posts.map((post) => <MainCard key={post.id} post={post}></MainCard>)
                )}
            </Container>
            <AuthRouter></AuthRouter>main
        </div>
    );
};

export default Main;

const MainHeader = () => {
    return (
        <div className="mainHeader">
            <div className="mainImgBox">
                <img className="mainLogo" src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png"></img>
            </div>
            <PostsAdd></PostsAdd>
        </div>
    );
};

const MainCard = ({ post }) => {
    return (
        <Card className="mainCard">
            <div className="PostsBodyHeader">
                <div className="PostsBodyHeaderImgBox">
                    <img className="PostsBodyHeaderImg" src={post.userImg} alt="userImg"></img>
                </div>
                {post.userName}
            </div>
            <img className="PostsBodyImg" src={post?.img} alt="postimg"></img>
            <p>{post?.content}</p>
        </Card>
    );
};

export const getPostMain = async (posts, follows, users) => {
    try {
        const filterPostMain = await posts.filter(({ userId }) => follows.every(({ following }) => userId !== following));
        const joinPostMain = await filterPostMain.map((post) => {
            const user = users.find((user) => user.id === post.userId);
            return { ...post, userName: user.name, userImg: user.img };
        });
        return joinPostMain;
    } catch (error) {
        throw error;
    }
};
