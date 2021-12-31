import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import Track from '../Track/Track'

class App extends React.Component {

  constructor(props){
      super(props);

      this.state = {
          searchResults: [{name: 'New Tooth', artist: 'Rich Brian', album: 'New Tooth', id: 1}, {name: 'Warm It Up', artist: 'Logic', album: 'Bobby Tarantino', id: 2}]
      }
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
        <SearchBar />
          <div className="App-playlist">
        <SearchResults searchResults={this.state.searchResults} />
        <Playlist />
          </div>
       </div>
      </div>
    )
  }
}


export default App;