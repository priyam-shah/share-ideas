import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";

import useStyles from "./styles.js";
import { commentPost } from "../../actions/posts";

const CommentSection = ({ post }) => {
  const classes = useStyles();

  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const commentsRef = useRef();

  const user = JSON.parse(localStorage.getItem("profile"));

  const handleComment = async () => {
    const newComments = await dispatch(
      commentPost(`${user?.result?.name} says: ${comment}`, post._id)
    );
    // when we click button -->
    // we want to dispatch a new action to our redux {commentPost action}

    setComment("");
    setComments(newComments);

    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments (login to comment)
          </Typography>
          {comments?.map((c, i) => (
            <Typography key={i} variant="subtitle1" gutterBottom>
              <strong> {c.split(": ")[0]} </strong>
              {c.split(":")[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {user?.result?.name && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Write a Comment
            </Typography>
            <TextField
              fullWidth
              rows={2}
              variant="outlined"
              label="Share Your Views..."
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <br />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment.length}
              color="primary"
              variant="contained"
              onClick={handleComment}
            >
              Suggest / Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
