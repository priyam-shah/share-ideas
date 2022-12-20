import React, { useEffect, useState } from "react";
import FeedbackIcon from "@material-ui/icons/Feedback";
import IconButton from "@material-ui/core/IconButton";
import "./style.css";
import zIndex from "@material-ui/core/styles/zIndex";

function Footer() {
  const [footerStyle, setFooterStyle] = useState({});
  const [url, setUrl] = useState("");

  useEffect(() => {
    const url = window.location.pathname;
    setUrl(url);
    // if (url === "/posts" || url === "/profile") {
    //   setFooterStyle({
    //     position: "relative",
    //   });
    // } else {
    //   setFooterStyle({
    //     position: "absolute",
    //   });
    // }
  }, [window.location.pathname]);

  return (
    <footer>
      <div style={{ height: "350", zIndex: 1 }}>
        <div class="footer-row" style={footerStyle}>
          <div
            class="col-lg-12 col-md-12 col-sm-12 footer-row-1"
            align="left"
            style={{
              marginTop: "0%",
              marginBottom: "0%",
              paddingLeft:
                (url === "/" || url === "/profile") && window.innerWidth > 600
                  ? "240px"
                  : "0px",
              padding: "30px",
            }}
          >
            <h1 class="text-uppercase" style={{ textAlign: "center" }}>
              <b
                class="footer-class"
                style={{
                  fontSize: "30px",
                  color: "orange",
                  fontFamily: "monospace",
                }}
              >
                About Share Ideas
              </b>
            </h1>
            <p style={{ textAlign: "center", color: "gray", fontSize: "18px" }}>
              Share Ideas is a full stack MERN application to share your ideas
              in the form of posts and view othrs.
            </p>

            <hr style={{ width: "20%", alignItems: "center" }}></hr>
            <h2
              style={{
                textAlign: "center",

                marginTop: "0px",
                marginBottom: "-5px",
                color: "brown",
              }}
            >
              Share your feedback:
            </h2>
            <p style={{ textAlign: "center" }}>
              <div className="swipeButton" style={{ marginBottom: "-15px" }}>
                <IconButton
                  style={{ color: "#00acee" }}
                  onClick={() => window.open("feedback")}
                >
                  <FeedbackIcon fontSize="large" />
                </IconButton>
                <IconButton
                  style={{ color: "#7289d9" }}
                  onClick={() => window.open("feedback")}
                ></IconButton>
              </div>
            </p>
            <h5
              style={{
                textAlign: "center",

                marginTop: "0px",
                marginBottom: "-5px",
                color: "brown",
              }}
            >
              (Application under build)
            </h5>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
