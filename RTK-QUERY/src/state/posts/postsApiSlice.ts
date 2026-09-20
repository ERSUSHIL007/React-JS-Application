import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Post } from "../../types/Post";

export const postsApiSlice = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => {
    return {
      getPosts: builder.query<Post[], { limit: number; offset: number }>({
        query: ({ limit, offset }) =>
          `/posts?_limit=${limit}&_offset=${offset}`,
      }),

      //Create POST Request
      createPost: builder.mutation<Post, Omit<Post, "id">>({
        query: (post) => ({
          url: "/posts",
          method: "POST",
          body: post,
        }),
      }),
    };
  },
});

export const { useGetPostsQuery, useCreatePostMutation } = postsApiSlice;
