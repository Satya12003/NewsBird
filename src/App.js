import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  useEffect(() => {
    let mybutton = document.getElementById("btn-back-to-top");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () {
      scrollFunction();
    };

    function scrollFunction() {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    }
    // When the user clicks on the button, scroll to the top of the document
    mybutton.addEventListener("click", backToTop);

    function backToTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }, []);

  const apikey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0);

  return (
    <div data-testid={'mainBody'} style={{ position: "relative" }}>
      <Router>
        <Navbar />
        <LoadingBar
          height={3}
          color="#f11946"
          progress={progress}
        //onLoaderFinished={}
        />

        <div className="container">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <News
                  apikey={apikey}
                  setProgress={setProgress}
                  key="general"
                  size={8}
                  country="in"
                  category="general"
                />
              }
            />
            <Route
              exact
              path="/sports"
              element={
                <News
                  apikey={apikey}
                  setProgress={setProgress}
                  key="Sports"
                  size={8}
                  country="in"
                  category="Sports"
                />
              }
            />
            <Route
              exact
              path="/business"
              element={
                <News
                  apikey={apikey}
                  setProgress={setProgress}
                  key="Business"
                  size={8}
                  country="in"
                  category="Business"
                />
              }
            />
            <Route
              exact
              path="/entertainment"
              element={
                <News
                  apikey={apikey}
                  setProgress={setProgress}
                  key="Entertainment"
                  size={8}
                  country="in"
                  category="Entertainment"
                />
              }
            />
            <Route
              exact
              path="/health"
              element={
                <News
                  apikey={apikey}
                  setProgress={setProgress}
                  key="Health"
                  size={8}
                  country="in"
                  category="Health"
                />
              }
            />
            <Route
              exact
              path="/science"
              element={
                <News
                  apikey={apikey}
                  setProgress={setProgress}
                  key="Science"
                  size={8}
                  country="in"
                  category="Science"
                />
              }
            />
            <Route
              exact
              path="/technology"
              element={
                <News
                  apikey={apikey}
                  setProgress={setProgress}
                  key="Technology"
                  size={8}
                  country="in"
                  category="Technology"
                />
              }
            />
          </Routes>
        </div>
      </Router>
      <button
        type="button"
        className="btn btn-danger btn-floating btn-lg my-5"
        style={{
          writingMode: "vertical-lr",
          borderRadius: "50px",
          position: "fixed",
          bottom: "10px",
          right: "20px",
          zIndex: 2,
        }}
        id="btn-back-to-top"
      >
        <span className="fas fa-arrow-up"></span>
      </button>
    </div>
  );
};

export default App;
