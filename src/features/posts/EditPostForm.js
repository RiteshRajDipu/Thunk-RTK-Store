import { useState } from "react";
import { deletePost, selectPostById , updatePost} from "./postsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { selectAllUsers } from "../users/usersSlice";
import { useDispatch, useSelector } from "react-redux";

const EditPostForm = () => {    
    const { postId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const post = useSelector((state) => selectPostById(state, Number(postId)))
    const users = useSelector(selectAllUsers)

    const [title, setTitle] = useState(post?.title);
    const [content, setContent] = useState(post?.body);
    const [userId, setUserId] = useState(post?.userId)
    const [requestStatus, setRequestStatus] = useState('idle')

   if(!post) {
    return (
        <section>
           <p>Post Not Found!</p>
        </section>
    )
   }

   const onTitleChanged = e => setTitle(e.target.value)
   const onContentChanged = e => setContent(e.target.value)
   const onAutherChanged = e => setUserId(e.target.value)

   const canSave = [title, content, userId].every(Boolean) && requestStatus === 'idle'
   
   const onSavePostClicked = () => {
     if(canSave) {
       try {
         setRequestStatus('pending')
          dispatch(updatePost({ id: post.id, title, body: content, userId, 
            reactions: post.reactions })).unwrap()
            setTitle("")
            setContent("")
            setUserId("")
            navigate(`/post/${userId}`)
       } catch (err) {
         console.error(err)
       } finally {
           setRequestStatus('idle')
          }
     }
   }

   const onDeletePostHandle = () => {
    if(canSave) {
        try {
            setRequestStatus('pemding')
            dispatch(deletePost({ id: post.id }))
            setTitle("")
            setContent("")
            setUserId("")
            navigate('/')
        } catch (error) {
            
        }
    }
   }

   const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
       {user.name}
    </option>
   ))

 
  return (
    <section>
        <h2>Edit Post</h2>
      <form>
      
         <label htmlFor="postTitle">Post Title:</label>
         <input 
          id="postTitle"
          name="postTitle"
          type="text"
          value={title}
          onChange={onTitleChanged}
          />
    
       <label htmlFor="postAuthor">Author:</label>
       <select id="postAuthor" defaultValue={userId} onChange={onAutherChanged}>
          <option value=""></option>
          {usersOptions}
       </select>
        <label htmlFor="postContent">Content</label>
        <textarea
           id="postContent"
           name="postContent"
           value={content}
           onChange={onContentChanged}
        />  
       <button 
         type="button"
         onClick={onSavePostClicked}
         disabled={!canSave}
       >
        Save Post
       </button>
       <button
         className="deleteButton"
         type="button" 
         onClick={onDeletePostHandle}
       >
        Delete Post
       </button>
      </form>
    </section>
  )
}

export default EditPostForm;
