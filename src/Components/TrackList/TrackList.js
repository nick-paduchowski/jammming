import React from "react";
import "./TrackList.css";
import Track from "../Track/Track.js";

export class TrackList extends React.Component {

  

  render() {

    let onAdd = this.props.onAdd;
    let onRemove = this.props.onRemove;
    let isRemoval = this.props.isRemoval;

    return (
      <div className="TrackList">
        {
          this.props.tracks && this.props.tracks.map(track => {

            return <Track track={track} key={track.id} onAdd={onAdd} onRemove={onRemove} isRemoval={isRemoval}/>
  
          })
        }
      </div>
    )
  }
}

