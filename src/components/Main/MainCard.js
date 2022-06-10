import { Card } from "reactstrap";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useState } from "react";

const MainCard = ({ post }) => {
  const [heart, isChecked] = useState(false);

  return (
    <Card className="mainCard" onClick={() => isChecked(!heart)}>
      <div className="PostsBodyHeader">
        <div className="PostsBodyHeaderImgBox">
          <img
            className="PostsBodyHeaderImg" //
            src={post.userImg}
            alt="userImg"
          ></img>
        </div>
        {post.userName}
      </div>
      <img
        className="PostsBodyImg"
        src={post?.img} //
        alt="postimg"
      ></img>
      <p>{post?.content}</p>
      <p>
        {heart ? (
          <HeartFilled style={{ color: "red" }}></HeartFilled>
        ) : (
          <HeartOutlined></HeartOutlined>
        )}
      </p>
    </Card>
  );
};

export default MainCard;
