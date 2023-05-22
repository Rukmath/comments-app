import {Component} from 'react'
import './index.css'
import {v4} from 'uuid'
import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {commentsList: [], name: '', comment: ''}

  onNameChange = event => {
    this.setState({name: event.target.value})
  }

  onCommentChange = event => {
    this.setState({comment: event.target.value})
  }

  onAddComment = event => {
    event.preventDefault()

    const {name, comment} = this.state

    const initialClass = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: v4(),
      name,
      comment,
      date: new Date(),
      isLiked: false,
      initialClassName: initialClass,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comment: '',
    }))
  }

  deleteComment = commentId => {
    const {commentsList} = this.state
    const filteredComments = commentsList.filter(
      eachComment => eachComment.id !== commentId,
    )

    this.setState({commentsList: filteredComments})
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  renderCommentsList = () => {
    const {commentsList} = this.state

    return commentsList.map(eachComment => (
      <CommentItem
        deleteComment={this.deleteComment}
        key={eachComment.id}
        commentDetails={eachComment}
        toggleIsLiked={this.toggleIsLiked}
      />
    ))
  }

  render() {
    const {commentsList, name, comment} = this.state

    return (
      <div className="layout-container">
        <div className="bg-container">
          <div className="combined-container">
            <form className="form-container" onSubmit={this.onAddComment}>
              <h1 className="main-heading">Comments</h1>
              <p className="desc">Say something about 4.0 Technologies</p>
              <input
                type="text"
                className="name-input"
                onChange={this.onNameChange}
                placeholder="Your Name"
                value={name}
              />
              <textarea
                onChange={this.onCommentChange}
                type="textarea"
                rows="5"
                className="comment-input"
                placeholder="Your Comment"
                value={comment}
              />
              <button type="submit" className="custom-btn">
                Add Comment
              </button>
            </form>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
                alt="comments"
                className="comment-img"
              />
            </div>
          </div>
          <hr className="partition-line" />
          <div className="comments-count-container">
            <p className="count">{commentsList.length}</p>
            <p className="comments-title">Comments</p>
          </div>
          <ul className="comments-list-container">
            {this.renderCommentsList()}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
