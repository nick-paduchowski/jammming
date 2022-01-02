import React from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar.js";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Track from "../Track/Track";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [
        { name: "New Tooth", artist: "Rich Brian", album: "New Tooth", id: 1 },
        {
          name: "Warm It Up",
          artist: "Logic",
          album: "Bobby Tarantino",
          id: 2,
        },
      ],
      playlistName: "MyPlaylist",
      playlistTracks: [
        { name: "Praise God", artist: "Kanye West", album: "Donda", id: 1 },
        {
          name: "The Parables",
          artist: "Cordae",
          album: "The Parables",
          id: 2,
        },
      ],
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find((current) => current.id === track.id)) {
      return;
    } else {
      tracks.push(track);
      this.setState({
        playlistTracks: tracks,
      });
    }
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks.filter(
      (current) => current.id !== track.id
    );
    this.setState({
      playlistTracks: tracks,
    });
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name,
    });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
