import { Button } from 'reactstrap';
import { useState } from 'react';
import './ProfileBody.css';

const ProfileBody = ({
    posts = new Array(5),
    follower = new Array(5),
    following = new Array(5),
    img = '/img/profile/dog.jpg',
    /* name = 'park', */
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const modalClose = () => {
        setIsOpen(false);
    };
    const modalOpen = () => {
        setIsOpen(true);
    };

    return (
        <>
            <div className="profileBodyBox">
                <div className="profileImgBox">
                    <img className="profileImg" src={img} alt="myProfileImg"></img>
                </div>
                <div className="profileTextBox">
                    <div>
                        {posts.length}
                        <br></br>
                        게시물
                    </div>
                    <div>
                        {follower.length}
                        <br></br>
                        팔로워
                    </div>
                    <div>
                        {following.length}
                        <br></br>
                        팔로잉
                    </div>
                </div>
            </div>
            <div className="profileBodyButtonBox">
                <Button block color="light"></Button>
                <Button block color="light">
                    보관함 보기
                </Button>
            </div>
        </>
    );
};

export default ProfileBody;
