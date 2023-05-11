import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

// console.log(formatDistanceToNow(new Date()));

import './index.css'

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
  state = {
    initialCommentsList: [],
    name: '',
    comment: '',
  }

  nameUpdate = event => {
    const typedText = event.target.value
    this.setState(prevState => ({...prevState, name: typedText}))
  }

  commentUpdate = event => {
    const typedComment = event.target.value
    this.setState(prevState => ({...prevState, comment: typedComment}))
  }

  onAddComment = event => {
    event.preventDefault()
    const {name, comment, initialCommentsList} = this.state

    const index = Math.ceil(
      Math.random() * initialContainerBackgroundClassNames.length - 1,
    )

    const profileBackgroundColor = initialContainerBackgroundClassNames[index]

    const commentDetails = {
      id: uuidv4(),
      name,
      comment,
      isLiked: false,
      time: new Date(),
      profileBackground: profileBackgroundColor,
    }

    this.setState({
      name: '',
      comment: '',
      initialCommentsList: [...initialCommentsList, commentDetails],
    })
  }

  onToggleLike = id => {
    this.setState(prevState => ({
      initialCommentsList: prevState.initialCommentsList.map(e => {
        if (e.id === id) {
          return {...e, isLiked: !e.isLiked}
        }
        return e
      }),
    }))
  }

  onDeleteComment = id => {
    const {initialCommentsList} = this.state
    const updatedCommentList = initialCommentsList.filter(e => e.id !== id)

    this.setState(prevState => ({
      ...prevState,
      initialCommentsList: updatedCommentList,
    }))
  }

  render() {
    const {initialCommentsList, name, comment} = this.state
    const noOfComments = initialCommentsList.length

    return (
      <div className="bg-container">
        <h1 className="heading">Comments</h1>
        <div className="upper-container">
          <form className="form-container" onSubmit={this.onAddComment}>
            <p>Say something about 4.0 Technologies</p>
            <input
              className="name-input"
              type="text"
              onChange={this.nameUpdate}
              value={name}
              placeholder="Your Name"
            />

            <textarea
              className="comment-body"
              cols="40"
              rows="10"
              onChange={this.commentUpdate}
              value={comment}
              placeholder="Your Comment"
            />

            <br />
            <button type="submit" className="button">
              Add Comment
            </button>
          </form>
          <div className="comment-image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="Comments"
              className="image"
            />
          </div>
        </div>

        <hr />
        <p>
          <span className="comment-count">{noOfComments}</span> Comments
        </p>
        <ul>
          {initialCommentsList.map(e => (
            <CommentItem
              commentDetails={e}
              key={e.id}
              onToggleLike={this.onToggleLike}
              onDeleteComment={this.onDeleteComment}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
