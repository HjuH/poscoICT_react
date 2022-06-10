export const getPostById = async (posts, id) => {
  try {
    console.log(id);
    const findPostById = await posts.filter((post) => post.id === Number(id));
    return findPostById;
  } catch (error) {
    throw error;
  }
};

export const getPostByUserId = async (posts, userId) => {
  try {
    console.log("사람 " + userId);
    const findPostByuserId = await posts.filter(
      (post) => post.userId === Number(userId)
    );
    console.log(findPostByuserId);
    return findPostByuserId;
  } catch (error) {
    throw error;
  }
};

export const postPost = async (posts, post) => {
  try {
    const newPost = { ...post, id: posts.length };
    return [...posts, newPost];
  } catch (error) {
    throw error;
  }
};

export const deletePostById = async (posts, id) => {
  const delPosts = await posts.filter((post) => post.id !== id);
  console.log(delPosts);
  return [...delPosts];
};

export const getPostByOther = async (posts, userId) => {
  try {
    const findPostByUserId = await posts.filter(
      (post) => post.userId !== Number(userId)
    );
    return findPostByUserId;
  } catch (error) {
    throw error;
  }
};

export const putPost = async (posts, post, id) => {
  try {
    const findPostIndex = await post.findIndex((post) => post.id === id);
    const { content, img } = post;
    if (findPostIndex === -1) {
      return new Error("index not found");
    }
    const newposts = [...posts];
    newposts.slice(findPostIndex, 1, { ...posts[findPostIndex], content, img });
    return newposts;
  } catch (error) {
    throw error;
  }
};

export const getPostByKey = async (posts, key, userId) => {
  try {
    const findPostByUserId = await posts.filter(
      (post) => userId === post.userId || key.test(post.content)
    );
    return findPostByUserId;
  } catch (error) {
    throw error;
  }
};

export const getPostMain = async (posts, follows, users) => {
  try {
    const filterPostMain = await posts.filter(
      (
        { userId } //
      ) => follows.every(({ following }) => userId !== following)
    );
    const joinPostMain = await filterPostMain.map((post) => {
      const user = users.find((user) => user.id === post.userId);
      return { ...post, userName: user.name, userImg: user.img };
    });
    return joinPostMain;
  } catch (error) {
    throw error;
  }
};
