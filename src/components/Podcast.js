import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const Podcast = ({ id, img, author, pod }) => {
  return (
    <Wrapper className="col mb-5">
      <Link to={`/podcast/${id}`} className="podcast-links">
        <div className="card h-100 position-relative border-0 shadow">
          <img
            src={img}
            className="card-img-top position-absolute top-0 start-50 translate-middle"
            alt={author}
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
          <div className="card-body mt-5">
            <h5 className="card-title">
              {author} - {pod}
            </h5>
            <p className="card-text">Author: {author}</p>
          </div>
        </div>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  min-height: 200px;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: inset 0 0 20px #ced4da;
    /* box-shadow: inset 0 0 20px #adb5bd; */
    padding: 0.5rem;
  }
  .podcast-links {
    text-decoration: none;
    color: #000000;
  }
`;

export default Podcast;
