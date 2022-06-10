export const postFollower = async (myId, userId) => {
  try {
    const newFollower = await { follower: userId, following: myId };
    return newFollower;
  } catch (error) {
    throw error;
  }
};

export const deleteFollowing = async (follows, myId, userId) => {
  try {
    console.log("myId " + myId + " userId" + userId);
    const delPosts = await follows.filter(
      (follow) => !(follow.follower === userId && follow.following === myId)
    );
    return delPosts;
  } catch (error) {
    throw error;
  }
};

export const getFollowerByMe = async (follows, myId) => {
  try {
    const findFollowerByMe = await follows.filter(
      (follow) => follow.follower === myId
    );
    return findFollowerByMe;
  } catch (error) {
    throw error;
  }
};

export const getFollowingByMe = async (follows, myId) => {
  try {
    const findFollowingByMe = await follows.filter(
      (follow) => follow.following === myId
    );
    return findFollowingByMe;
  } catch (error) {
    throw error;
  }
};

export const getFollowingByMeOne = async (follows, myId, userId) => {
  try {
    const findFollowingByMe = await follows.filter(
      (follow) => follow.following === myId && follow.follower === userId
    );
    return findFollowingByMe;
  } catch (error) {
    throw error;
  }
};
