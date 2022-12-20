import React, { useState } from "react";

import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";

// useLocation -- to know on which page are we currently
// useHistory -- to re navigate to certain pages and search terms
import { useHistory, useLocation } from "react-router-dom";

import ChipInput from "material-ui-chip-input";

// importing hook from react-redux
import { useDispatch } from "react-redux";
// allows us to dispatch an action

import { getPostsBySearch } from "../../actions/posts";

import Pagination from "../Pagination";

import Posts from "../Posts/Posts.js";
import Form from "../Form/Form.js";

import useStyles from "./styles";

// url search params
// - to know on which page we are currently on and what search term are we looking for
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const classes = useStyles();

  // query is where we'll be getting our page info from
  const query = useQuery();

  // this is going to read our url and see if we have a page parameter in there
  // if so its going to populate with this variable
  // else (ie if we dont have the page) we must be on the first one
  const page = query.get("page") || 1;

  const searchQuery = query.get("searchQuery");

  const [currentId, setCurrentId] = useState(0);

  const dispatch = useDispatch();
  const history = useHistory();

  // state field for the search Ideas field
  const [search, setSearch] = useState("");

  const [tags, setTags] = useState([]);

  // -- no longer fetch the post from home
  // --- but pass the page straight to our pagination as a prop
  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [currentId, dispatch]);

  const searchPost = () => {
    if (search.trim() || tags) {
      // dispatch -> fetch search post
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));

      history.push(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      history.push("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      // search post
      searchPost();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));

  return (
    <Grow in>
      <Container maxwidth="xl">
        <Grid
          // className={classes.mainContainer}
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                onKeyDown={handleKeyPress}
                name="search"
                variant="outlined"
                label="Search Ideas"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                varient="outlined"
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                varient="contained"
                color="primary"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper className={classes.pagination} elevation="6">
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
