import { useState } from 'react';
import { BiLogOut } from 'react-icons/bi';
import { GoDiffAdded } from 'react-icons/go';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Button } from 'reactstrap';
import { logout } from '../store/users';
import './ProfileHeader.css';
import ProfileHeaderAddModal from './ProfileHeaderAddModal';

const ProfileHeader = ({ name }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onClickLogout = () => {
        dispatch(logout());
        navigate('/login');
    };
    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => {
        setIsOpen(false);
    };
    const openModal = () => {
        setIsOpen(true);
    };

    return (
        <div className="ProfileHeaderBox">
            <div>
                <h2>{name}</h2>
            </div>

            <div>
                <Button outline onClick={openModal}>
                    <GoDiffAdded size={30}></GoDiffAdded>
                </Button>
                <Button outline onClick={onClickLogout}>
                    <BiLogOut size={30}></BiLogOut>
                </Button>
            </div>
            <ProfileHeaderAddModal isOpen={isOpen} closeModal={closeModal}></ProfileHeaderAddModal>
        </div>
    );
};

export default ProfileHeader;
