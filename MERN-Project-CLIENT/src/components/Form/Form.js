import React, { useState, useEffect } from "react";

// importing all components that we r gonna use for adding jsx
import { TextField, Button, Typography, Paper } from "@material-ui/core";

import FileBase from "react-file-base64";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles.js";
import ChipInput from "material-ui-chip-input";

import { createPost, updatePost } from "../../actions/posts.js";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    // creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  // we want data for the updated posts
  // - we use ternery (if we have current id)
  // -- then we loop over state.posts and call a find() method on them
  // --- more specifically -> we want to find the post (p) that has the same id as our currentId
  // ---- else null
  const post = useSelector((state) =>
    currentId
      ? state.posts.posts.find((message) => message._id === currentId)
      : null
  );

  const classes = useStyles();
  const history = useHistory();

  const dispatch = useDispatch();
  // we will dispatch this in handleSubmit

  const user = JSON.parse(localStorage.getItem("profile"));

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: "", message: "", tags: [], selectedFile: "" });
  };

  // now we use useEffects to populate the values of the form
  // - { updating - so we dont need to write everything again}
  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    // we will send post request with all the data usse types in
    e.preventDefault();
    // (always use) not to get the refresh in the browser

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
      clear();
    } else {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography varient="h6" align="center">
          Sign In to share your ideas and like other's.
        </Typography>
      </Paper>
    );
  }

  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({
      ...postData,
      tags: postData.tags.filter((tag) => tag !== chipToDelete),
    });
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography varient="h6">
          {currentId ? `Editing "${post?.title}"` : "Creating"}
        </Typography>

        {/* <TextField
          neme="creator"
          variant="filled"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        /> */}

        <TextField
          neme="title"
          variant="standard"
          label="Title / Subject"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />

        <TextField
          neme="message"
          variant="standard"
          label="Description /  Message"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />

        <div style={{ padding: "5px 0", width: "94%" }}>
          <ChipInput
            neme="tags"
            variant="standard"
            label="Tags (coma seperated)"
            fullWidth
            value={postData.tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        </div>

        {/* <TextField
          neme="tags"
          variant="standard"
          label="Tags (coma seperated)"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        /> */}

        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>

        <Button
          className={classes.buttonSubmit}
          varient="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>

        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
