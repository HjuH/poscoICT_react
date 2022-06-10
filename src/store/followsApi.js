import { customAxios } from "../http/customAxios";

export const postFollower = async (userId) => {
  try {
    // const newFollower = await { follower: myId, following: userId };
    const { data } = await customAxios("post", `/follow/${userId}`);
    return data;
  } catch (error) {
    throw error;
  }
};
export const deleteFollowing = async (userId) => {
  try {
    const { data } = await customAxios("delete", `/follow/${userId}`);

    return data;
  } catch (error) {
    throw error;
  }
};

export const getFollowerByMe = async (follows, myId) => {
  try {
    const findFollowerByMe = await follows.filter(
      (follow) => follow.following === myId
    );
    return await customAxios("/follow/my/follower", "get");
  } catch (error) {
    throw error;
  }
};

export const getFollowingByMe = async (follows, myId) => {
  try {
    const findFollowingByMe = await follows.filter(
      (follow) => follow.follower === myId
    );
    return await customAxios("/follow/my/following", "get");
  } catch (error) {
    throw error;
  }
};

export const getFollowingByMeOne = async (userId) => {
  try {
    const { data } = await customAxios("get", `/follow/follower/${userId}`);
    return data.length === 0 ? false : true;
  } catch (error) {
    throw error;
  }
};
