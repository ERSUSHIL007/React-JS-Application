import { useCreatePostMutation, useGetPostsQuery } from "../state/posts/postsApiSlice"

const PostsList = () => {

    const { data: posts, isLoading, isError } = useGetPostsQuery({
        limit: 5,
        offset: 0,
    })

    const [createPostMutation, { isLoading: isCreatingPost }] = useCreatePostMutation()

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error...</div>
    }

    return <div>
        <button
            className="counter-button counter-button--primary"
            onClick={() => {
                const post = { title: 'My Post Created!' };
                createPostMutation(post)
            }}
        >
            {isCreatingPost ? 'Creating Post...' : 'Create Post'}
        </button>
        <ul>
            {
                posts?.map((post) => {
                    return <li key={post.id}>{post.title}</li>
                })
            }
        </ul>
    </div>

}

export default PostsList