import './index.css'

import {formatDistanceToNow} from 'date-fns'

const CommentItem = props => {
  const {commentDetails, onToggleLike, onDeleteComment} = props
  const {id, name, comment, isLiked, time, profileBackground} = commentDetails
  const postedDate = formatDistanceToNow(time)
  const likeImage = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const onLike = () => {
    onToggleLike(id)
  }

  const onDelete = () => {
    onDeleteComment(id)
  }

  return (
    <li className="list-item">
      <div className="profile-name-date">
        <p className={`profile ${profileBackground}`}>{name[0]}</p>
        <p>{name}</p>
        <p className="time">{postedDate}</p>
      </div>
      <p className="comment-body">{comment}</p>
      <div className="like-delete-buttons">
        <button type="button" onClick={onLike} className="like-button">
          <img src={likeImage} alt="like" />
          Like
        </button>
        <button
          type="button"
          className="delete-button"
          onClick={onDelete}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete-button"
          />
        </button>
      </div>
      <hr />
    </li>
  )
}

export default CommentItem
