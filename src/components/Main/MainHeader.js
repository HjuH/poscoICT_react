import React from "react";
import { Button } from "reactstrap";
import PostsAdd from "../Posts/PostsAdd";
import { AiOutlineCompass, AiOutlineHeart } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";

const MainHeader = () => {
  return (
    <div className="mainHeader">
      <div className="mainImgBox">
        <img
          className="mainLogo"
          src="https://www.instagram.com/static/images/web/logged_out_wordmark-2x.png/d2529dbef8ed.png"
          alt="Logo"
        ></img>
      </div>
      <div className="icons">
        <Button outline color="secondary" style={{ border: "none" }}>
          <AiOutlineCompass></AiOutlineCompass>
        </Button>
        <Button outline color="secondary" style={{ border: "none" }}>
          <AiOutlineHeart></AiOutlineHeart>
        </Button>
        <Button outline color="secondary" style={{ border: "none" }}>
          <BsPerson></BsPerson>
        </Button>
      </div>
    </div>
  );
};

export default MainHeader;
