import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
const Tracks = ({ track, id }) => {
  return (
    <>
      <div className="row border tracks">
        <div className="col col-md-8 border-end p-2 ">
          <Link to={`/podcast/${id}/episode/${track.trackId}`} className="track-link block">
            {track.trackName}
          </Link>
        </div>
        <div className="col  border-end p-2 ">{moment(track.releaseDate).format("L")}</div>
        <div className="col p-2 ">{track.duration}</div>
      </div>
    </>
  );
};

export default Tracks;
