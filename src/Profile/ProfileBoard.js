import { useState } from 'react';
import './ProfileBoard.css';
import ProfileBoardDetail from './ProfileBoardDetail';

const ProfileBoard = ({ posts, name, img }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [clickPost, setClickPost] = useState();
    const openModal = (post) => {
        setClickPost(post);
        setIsOpen(true);
    };
    const closeModal = () => {
        setClickPost();
        setIsOpen(false);
    };
    console.log(posts);
    return (
        <div className="profileBoard">
            {posts?.map((post) => (
                <div className="profileBoardImgBox" onClick={() => openModal(post)}>
                    <img className="profileBoardImg" key={post.id} src={post.img} alt={post.content}></img>
                </div>
            ))}
            {clickPost ? (
                <ProfileBoardDetail
                    name={name}
                    img={img}
                    isOpen={isOpen}
                    clickPost={clickPost}
                    closeModal={closeModal}
                ></ProfileBoardDetail>
            ) : null}
        </div>
    );
};

export default ProfileBoard;
