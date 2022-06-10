import axios from "axios";
import { customAxios } from "../http/customAxios";

export const loginCheckApi = async (users, id) => {
  return await customAxios("/user/check", "get");
};

export const getUserById = async (users, id) => {
  return await customAxios(`/user/${id}`, "get");
};

export const getUserByUserId = async (users, userId) => {
  const findUserByUserId = await users.find((user) => user.userId === userId);
  return findUserByUserId;
};
export const getUserByKey = async (users, key) => {
  const findUserByUserId = await users.find((user) => key.test(user.name));
  return findUserByUserId;
};

export const postUser = async (users, user) => {
  const newUser = { ...user, userId: user.id, id: users.length };
  return await customAxios("/user/", "post", newUser);
};

export const loginApi = async (users, user) => {
  const checkUser = await users.find(
    (data) => data.userId === user.id && data.password === user.password
  );
  const newUser = { ...user, userId: user.id, id: null };
  const response = await axios({
    method: "post",
    data: newUser,
    url: "http://localhost:8000/user/login",
  });

  console.log(response);
  return { isLogin: checkUser ? true : false, user: checkUser };
};

export const checkId = async (users, userId) => {
  const isCheckId = (await users.find((user) => user.userId === userId))
    ? true
    : false;
  return isCheckId;
};

export const logoutApi = async (userId) => {
  return true;
};
export const putUsers = async (users, user, id) => {
  const { data } = await customAxios("put", `/user`, user);
  if (data) {
    return user;
  }
};
