import React from 'react'
import { Descriptions, Badge } from 'antd';
import './MovieInfo.css';
function MovieInfo(props) {

  const { movie } = props;

  return (
    <>
      


      <br />

      <div className="table-container" role="table" style={{ color: 'white', background: 'rgba(0,0,0,0.3)', width: '100%', }}>
        
 
          <div className="flex-row" role="cell">Title </div>
          <div className="flex-row" role="cell">{movie.original_title}</div>
          <div className="flex-row" role="cell">Release Date </div>
          <div className="flex-row" role="cell">{movie.release_date}</div>
          <div className="flex-row" role="cell">Runtime</div>
          <div className="flex-row" role="cell">{movie.runtime} minutes</div>
          <div className="flex-row" role="cell">Average Vote</div>
          <div className="flex-row" role="cell">{movie.vote_average}</div>

      </div>
      
    </>
  )
}

export default MovieInfo
