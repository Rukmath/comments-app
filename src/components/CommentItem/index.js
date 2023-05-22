import './index.css'
import {formatDistanceToNow} from 'date-fns'

const CommentItem = props => {
  const {commentDetails, deleteComment, toggleIsLiked} = props
  const {id, name, comment, date, isLiked, initialClassName} = commentDetails
  const initial = name[0].toUpperCase()
  const timeTillNow = formatDistanceToNow(date)
  const likedUrl =
    'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
  const disLikedUrl =
    'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const image = isLiked ? likedUrl : disLikedUrl

  const onClickLike = () => {
    toggleIsLiked(id)
  }

  const onClickDelete = () => {
    deleteComment(id)
  }

  return (
    <li className="comment-container">
      <div className="name-time-container">
        <p className={initialClassName}>{initial}</p>
        <div className="combined-container">
          <div className="name-time">
            <h1 className="name">{name}</h1>
            <p className="time">{timeTillNow}</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="button-container">
        <button onClick={onClickLike} type="button" className="img-btn">
          <img src={image} alt="like" className="liked-img" />
        </button>

        <button
          data-testid="delete"
          type="button"
          onClick={onClickDelete}
          className="img-btn"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png "
            alt="delete"
            className="delete-img"
          />
        </button>
      </div>
    </li>
  )
}

export default CommentItem
