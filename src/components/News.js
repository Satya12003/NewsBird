import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Loader from "./Loader";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setAritcles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setloading] = useState(false);
  const [totalResults, settotalResults] = useState(0);

  //document.title = `${ props.category} - NewsBird`;

  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.size}`;
    setloading(true);
    let data = await fetch(url);
    props.setProgress(40);
    let parsedData = await data.json();
    props.setProgress(80);
    setAritcles(parsedData.articles);
    settotalResults(parsedData.totalResults);
    setloading(false);
    props.setProgress(100);
  };
  
  useEffect(() => {
    updateNews();
  }, []);

  const fetchMoreData = async () => {
    setPage(page + 1);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.size}`;
    setloading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    settotalResults(parsedData.totalResults);
    setloading(false);
    setAritcles(articles.concat(parsedData.articles));
    //console.log( state.totalResults,":", state.articles.length)
  };

  return (
    <div style={{ height: "725px" }}>
      <div className="container" style={{ height: "500px",marginTop : "70px"}}>
        <h1 className="text-center">Todays top News on {props.category}</h1>
        {loading && (
          <div className="text-center my-5">
            <Loader />
          </div>
        )}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={
            articles.length !== totalResults && articles.length <= totalResults
          }
          loader={
            <div className="text-center">
              <Loader />
            </div>
          }
        >
          <div className="row">
            {articles.map((element, idx) => {
              return (
                <div className="col-md-3" key={element.url + `${idx}`}>
                  <NewsItem
                    source={element.source.name}
                    title={element.title}
                    descreption={element.description}
                    imgtoshow={element.urlToImage}
                    link={element.url}
                    date={element.publishedAt}
                    author={element.author}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default News;

News.defaultProps = {
  country: "in",
  size: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  size: PropTypes.number,
  category: PropTypes.string,
};
