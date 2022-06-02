import './App.css';
import Join from './components/Join/Join';
import BootstrapLogin from './components/Login/BootstrapLogin';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import Page404 from './components/Page404';
import { useState } from 'react';
import { Users } from './data/User';
import { Post } from './data/Post';
import { Follows } from './data/Follow';
import { UserContext } from './store/UserContext';
import { PostContext } from './store/PostContext';
import { FollowContext } from './store/FollowContext';
import Layout from './components/Layout/Layout';
import Profile from './Profile/Profile';

function App() {
    const [users, setUsers] = useState(Users);
    const insertUsers = (user) => {
        const newUser = { ...user, userId: user.id, id: Users.length.toString };
        console.log(users);
        setUsers([...users, newUser]);
        console.log(users);
    };
    const updateUsers = (user) => {
        const id = localStorage.getItem('id');
        const { img, name } = user;
        const findUsersIndex = users.findIndex((user) => user.id === id);
        if (findUsersIndex === -1) {
            console.error('not found');
            return;
        }
        const newUsers = [...users];
        newUsers.splice(findUsersIndex, 1, { ...users[findUsersIndex], name, img });
        setUsers(newUsers);
    };

    const [posts, setPosts] = useState(Post);
    const insertPost = (post) => {
        const newPost = { ...post, userId: localStorage.getItem('id'), id: posts.length };
        setPosts([...posts, newPost]);
    };

    const [follows, setFollows] = useState(Follows);
    const insertFollow = (followerId) => {
        const newFollow = { following: localStorage.getItem('id'), follower: followerId };
        setFollows([...follows, newFollow]);
    };

    return (
        <div className="App">
            <UserContext.Provider value={{ users, insertUsers, updateUsers }}>
                <PostContext.Provider value={{ posts, insertPost }}>
                    <FollowContext.Provider value={{ follows, insertFollow }}>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<Layout></Layout>}>
                                    <Route index element={<Main></Main>}></Route>
                                    <Route path="/shopping" element={<Main></Main>}></Route>
                                    <Route path="/profile" element={<Profile></Profile>}></Route>
                                </Route>
                                <Route path="/login" element={<BootstrapLogin></BootstrapLogin>}></Route>
                                <Route path="/join" element={<Join></Join>}></Route>
                                <Route path="/*" element={<Page404></Page404>}></Route>
                            </Routes>
                        </BrowserRouter>
                    </FollowContext.Provider>
                </PostContext.Provider>
            </UserContext.Provider>
        </div>
    );
}

export default App;
