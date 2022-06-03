import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { insertPosts, selectMyPost } from '../store/posts';

const PostsAdd = () => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        content: '',
        img: '/img/post/post1.jpg',
    });
    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => {
        setIsOpen(false);
    };
    const openModal = () => {
        setIsOpen(true);
    };
    const onChangeFile = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise((resolve) => {
            reader.onload = () => {
                setForm({ ...form, img: reader.result });
                resolve();
            };
        });
    };
    const onChangeName = (e) => {
        const { value } = e.target;
        setForm({ ...form, content: value });
    };
    const onSubmit = async () => {
        await dispatch(insertPosts(form));
        await dispatch(selectMyPost());
        closeModal();
    };
};

export default PostsAdd;
