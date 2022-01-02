let accessToken;

let clientID = "ead667caf52447b681dc8fa31fb108ab";

let redirectURI = "http://localhost:3000";

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in([^&]*)/);

    if (accessTokenMatch && expiresInMatch){
        accessToken = accessTokenMatch[1];
        const expiresIn = Number(expiresInMatch[1])

        window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
        window.history.pushState("Access Token", null, "/");
        return accessToken;
    } else {
        window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`

    }

  },

  search(searchTerm){

    const accessToken = Spotify.getAccessToken();

    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
        headers: {Authorization: `Bearer ${accessToken}`}
    }).then(response => {
        return response.json();
    }).then(jsonResponse => {
        if (!jsonResponse.tracks){
            return [];
        } else {
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        }
    })
  },

  savePlaylist(playlistName, trackURIs){
      if(!playlistName || !trackURIs.length){
        return;

      } else {
        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`};
        let userID;
        let playlistID;

        return fetch('https://api.spotify.com/v1/me', {
            headers: headers
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            userID = jsonResponse.id;
            return fetch(`https://api.spotify,com/v1/users/${userID}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name : playlistName})
            }).then(response2 => response2.json()
            ).then(jsonResponse2 => {
                playlistID = jsonResponse2.id;
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks
                `, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({uris: trackURIs})
                })
            })
        })
      }
  }


};

export default Spotify;
