import React from "react";

const NewsItem = (props) => {
    let { title, descreption, imgtoshow, link, date, author,source} = props;
    return (
      <div>
        <div className="card my-2" style={{ width: "18rem"}}>
          <span style = {{zIndex : 1,left : "90%"}}className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
            {source}
            <span className="visually-hidden">unread messages</span>
          </span>
          <img className="card-img-top" src={!imgtoshow ? "data:image/png;base64,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" : imgtoshow} alt="NoImage" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{descreption}</p>
            <p className="card-text">
              <small className="text-muted">
                By {author} on {new Date(date).toGMTString()}
              </small>
            </p>
            <a href={link} target="new" className="btn btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
}

export default NewsItem;
