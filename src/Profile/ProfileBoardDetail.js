import { Modal } from 'bootstrap';
import { Button, Container } from 'reactstrap';

const ProfileBoardDetail = ({ name, img, isOpen, clickPost, closeModal }) => {
    console.log(clickPost);
    return (
        <Modal isOpen={isOpen} fullscreen toggle={closeModal}>
            <div className="profileBoardModalHeader">
                <div>
                    <Button close onClick={closeModal}></Button>{' '}
                </div>
                <div>
                    {name}
                    <strong>게시물</strong>
                </div>
                <div>
                    <Button color="danger" outline>
                        삭제하기
                    </Button>
                </div>
            </div>
            <Container>
                <div className="profileBoardBody">
                    <div className="profileBoardModalHeader">
                        <div className="profileBoardModalHeaderImgBox">
                            <img className="profileBoardModalHeaderImg" src={img} alt="userImg"></img>
                        </div>
                        {name}
                    </div>
                    <img className="profileBoardBodyImg" src={clickPost.img} alt="postimg"></img>
                    <p>{clickPost.content}</p>
                </div>
            </Container>
        </Modal>
    );
};

export default ProfileBoardDetail;
