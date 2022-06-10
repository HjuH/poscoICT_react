import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Follow } from "../data/Follow";
import {
  deleteFollowing,
  getFollowerByMe,
  getFollowingByMe,
  getFollowingByMeOne,
  postFollower,
} from "./followAPI";
const initialState = {
  follows: Follow,
  myFollowing: {
    follows: [],
    loading: false,
    message: "",
  },
  myFollower: {
    follows: [],
    loading: false,
    message: "",
  },
};

const SELECT_MY_FOLLOWER = "SELECT_MY_FOLLOWER";
const SELECT_MY_FOLLOWERING = "SELECT_MY_FOLLOWERING";
const DELETE_FOLLOWING = "DELETE_FOLLOWING";
const INSERT_FOLLOWING = "INSERT_FOLLOWING";
const SELECT_MY_FOLLOWING_ONE = "SELECT_MY_FOLLOWING_ONE";
export const selectMyFollower = createAsyncThunk(
  SELECT_MY_FOLLOWER,
  async (payload, thunkAPI) => {
    const { myId } = thunkAPI.getState().users;
    const { follows } = thunkAPI.getState().follows;
    console.log("myId " + myId);
    console.log(follows);
    if (myId) {
      const myFollows = await getFollowerByMe(follows, Number(myId));
      return myFollows;
    } else if (myId === 0 || myId === "0") {
      const myFollows = await getFollowerByMe(follows, Number(myId));
      return myFollows;
    }
    return;
  }
);

export const selectMyFollowing = createAsyncThunk(
  SELECT_MY_FOLLOWERING,
  async (payload, thunkAPI) => {
    const { myId } = thunkAPI.getState().users;
    const { follows } = thunkAPI.getState().follows;
    if (myId) {
      const myFollows = await getFollowingByMe(follows, Number(myId));
      return myFollows;
    } else if (myId === 0 || myId === "0") {
      const myFollows = await getFollowingByMe(follows, Number(myId));
      return myFollows;
    }
    return;
  }
);

export const deleteFollow = createAsyncThunk(
  DELETE_FOLLOWING,
  async (payload, thunkAPI) => {
    const { myId } = thunkAPI.getState().users;
    const { follows } = thunkAPI.getState().follows;
    return await deleteFollowing(follows, Number(myId), payload);
  }
);

export const insertFollowing = createAsyncThunk(
  INSERT_FOLLOWING,
  async (payload, thunkAPI) => {
    const { myId } = thunkAPI.getState().users;
    if (myId) {
      const myfollows = await postFollower(Number(myId), payload);
      return myfollows;
    } else if (myId === 0 || myId === "0") {
      const myfollows = await postFollower(Number(myId), payload);
      return myfollows;
    } else {
      return;
    }
  }
);
export const selectMyFollowingOne = createAsyncThunk(
  SELECT_MY_FOLLOWING_ONE,
  async (payload, thunkAPI) => {
    const { myId } = thunkAPI.getState().users;
    const { follows } = thunkAPI.getState().follows;
    const userId = payload;
    if (myId) {
      const myfollows = await getFollowingByMeOne(
        follows,
        Number(myId),
        userId
      );
      console.log(myfollows);
      return myfollows.length !== 0 ? true : false;
    } else if (myId === 0 || myId === "0") {
      const myfollows = await getFollowingByMeOne(
        follows,
        Number(myId),
        userId
      );
      console.log(myfollows);
      return myfollows !== 0 ? true : false;
    } else {
      return;
    }
  }
);

export const followsSlice = createSlice({
  name: "follows",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(insertFollowing.fulfilled, (state, { payload }) => {
        const newFollows = [...state.follows, payload];
        return { ...state, follows: newFollows };
      })
      .addCase(insertFollowing.rejected, (state, { error }) => {
        return { ...state };
      })
      .addCase(deleteFollow.fulfilled, (state, { payload }) => {
        return { ...state, follows: payload };
      })
      .addCase(deleteFollow.rejected, (state, { error }) => {
        return { ...state };
      })
      .addCase(selectMyFollower.pending, (state, { payload }) => {
        const newMyFollower = { ...state.myFollower };
        newMyFollower.loading = true;
        return { ...state, myFollower: newMyFollower };
      })
      .addCase(selectMyFollower.fulfilled, (state, { payload }) => {
        const newMyFollowers = { ...state.myFollower };
        newMyFollowers.loading = false;
        if (payload) {
          newMyFollowers.follows = payload;
          return { ...state, myFollower: newMyFollowers };
        } else {
          return { ...state, myFollower: newMyFollowers };
        }
      })
      .addCase(selectMyFollower.rejected, (state, { error }) => {
        const newMyFollowers = { ...state.myFollower };
        newMyFollowers.loading = false;
        newMyFollowers.message = error.message;
        return { ...state, myFollower: newMyFollowers };
      })
      .addCase(selectMyFollowing.pending, (state, { payload }) => {
        const newFollowing = { ...state.myFollowing };
        newFollowing.loading = true;
        return { ...state, myFollowing: newFollowing };
      })
      .addCase(selectMyFollowing.fulfilled, (state, { payload }) => {
        const newFollowing = { ...state.myFollowing };
        newFollowing.loading = false;
        if (payload) {
          newFollowing.follows = payload;
          return { ...state, myFollowing: newFollowing };
        } else {
          return { ...state, myFollowing: newFollowing };
        }
      })
      .addCase(selectMyFollowing.rejected, (state, { error }) => {
        const newFollowing = { ...state.myFollowing };
        newFollowing.loading = false;
        newFollowing.message = error.message;
        return { ...state, myFollowing: newFollowing };
      });
  },
});

export default followsSlice.reducer;
