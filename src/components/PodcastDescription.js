import React from "react";

const PodcastDescription = ({ image, artistName, collectionName, description }) => {
  return (
    <section className="artist-description shadow py-2">
      <div>
        <img className="card-img-top mt-2" src={image} alt={artistName} />
        <hr />
        <div className="card-body">
          <h5 className="card-title px-4">{collectionName}</h5>
          <p className="px-4">
            <em>{collectionName}</em>
          </p>
          <hr />
          <h6 className="px-4">Description:</h6>
          <p className="card-text px-4 mb-2">
            <em>{description}</em>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PodcastDescription;
