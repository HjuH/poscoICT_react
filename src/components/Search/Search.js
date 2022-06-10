import { useEffect, useState } from "react";
import Post from "../Posts/Post";
import SearchBar from "./SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { selectOtherPost } from "../../store/posts";
import { selectUserByKey } from "../../store/users";
import { selectPostsByKey } from "../../store/posts";

const Search = () => {
  const dispatch = useDispatch();
  const otherPosts = useSelector((state) => state.posts.otherPosts);

  useEffect(() => {
    dispatch(selectOtherPost());
    setSearchPost(otherPosts);
  }, []);
  const [searchPost, setSearchPost] = useState(otherPosts);
  const [searchKey, setSearchKey] = useState();

  const onSubmitSearch = async (e) => {
    e.preventDefault();
    //action

    const findUserId = await dispatch(selectUserByKey(searchKey)).unwrap();
    await dispatch(selectPostsByKey({ searchKey, userId: findUserId }));
  };

  return (
    <div>
      <SearchBar
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        onSubmitSearch={onSubmitSearch}
      ></SearchBar>
      <Post posts={otherPosts.posts} postState={otherPosts}></Post>
    </div>
  );
};
export default Search;
