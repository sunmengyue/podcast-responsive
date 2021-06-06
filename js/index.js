let token =
  'Bearer BQAhpjWB5ci7OB08xRwbb59sy_EZ7QjwU_LQuprvjKSxPRpyx2egY0U2nr5c51sTekG9I1lQigt17oz9jSR074qM6eDBTHAJv4B8uG10o-oB54q45ygw8ATzweg6Tx3n8mm3r-tnzYiK65UoO0ZBAh5IuR1ksnGBO8XkNM1uT_xZBca1B-Zd4HLQFK1BC_6RS76GmxgA_19qwVkpWybB_llYohAYI4m0uIJMJmRA1ewx6MZmT_Zl6h_lyvOYUH1NkFghG4m4cB1BRaV0kV8Ddz_ZeVJt-1X8HwQo7cg6';

let show_url = 'https://api.spotify.com/v1/shows';
let episodes_url = '	https://api.spotify.com/v1/episodes';

function fetch_featured() {
  let show_id = '3rwr9GdoHxMWF8yZhsBzHn';
  fetch(show_url + '?ids=' + show_id + '&market=US', {
    method: 'GET',
    headers: {
      "Authorization": token,
      "Accept": 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      let show = data.shows[0];
      let featured_html = `
      <div class="featured">
          <img src= '${show.images[1].url}'/>
          <div>
            <h2>${show.name}</h2>
            <h4>${show.description}</h4>
            <h3>Don't forget to listen to today's episode</h3>
            <button>Listen Now</button>
          </div>
      </div>
    `;
      document.querySelector('.featured__container').innerHTML = featured_html;
    })

    .catch(console.log);
}

function fetch_latest() {
  let show_ids =
    '6xpiit8aJmwDHk1rKdxmri%2C3rwr9GdoHxMWF8yZhsBzHn%2C2jfWVEgKGZMazgou1hXH1R';
  fetch(show_url + '?ids=' + show_ids + '&market=US', {
    method: 'GET',
    headers: {
      "Authorization": token,
      "Accept": 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      data.shows.forEach((show) => {
        let show_html = `
        <div class="show" onclick='location.href="show.html?id=${show.id}"'>
            <img src= '${show.images[1].url}'/>
            <div>
              <h4>${show.name}</h4>
              <h5>${show.publisher}</h5>
            </div>
        </div>
      `;
        document.querySelector('.shows').innerHTML += show_html;
      });
    });
}

function fetch_all() {
  fetch_featured();
  fetch_latest();
}

function fetch_episodes() {
  let episodes_ids =
    '32YSeE6vqKDfsP6y34ooDI%2C6bDw9bcJkVJ46OZfICIsDF%2C654uNk00lsgyFT7dvt2UOO%2C4cdTFghnLPi0C7wg8oXXE3';
  fetch(episodes_url + '?ids=' + episodes_ids + '&market=US', {
    method: 'GET',
    headers: {
      "Authorization": token,
      "Accept": ' application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      data.episodes.forEach((episode) => {
        let episode_html = `
          <div class="episode"> 
              <img src="${episode.images[1].url}"/>
            <div class="main_container">
              <h3>${episode.name}</h3>
              <h4>${episode.description}</h4>
              <div>
                <button>play</button>
                <h5>${episode.release_date}</h5>
              </div>
            </div>
          </div>
        `;
        document.querySelector('.episodes').innerHTML += episode_html;
      });
    });
}

function fetch_episodesInaShow(id) {

  let all_episodes_url = `https://api.spotify.com/v1/shows/${id}/episodes`;
  fetch(all_episodes_url + '?market=US&limit=10&offset=0', {
    method: 'GET',
    headers: {
      "Authorization": token,
      "Accept": 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      data.items.forEach((item) => {
        let item_html = `
          <div class="episode"> 
            <img src="${item.images[1].url}"/>
            <div class="audio">
              <div class="play_button">
                <audio src="${item.audio_preview_url}" controls></audio>
              </div>
            <h3>preview</h3>
          </div>
          <div class="main_container">
            <h3>${item.name}</h3>
            <h4>${item.description}</h4>
            <div>
              <button>play</button>
              <h5>${item.release_date}</h5>
            </div>
          </div>
        </div>
        `;
        document.querySelector('.episodes_content').innerHTML += item_html;
      });
    });
}

function getShow(id) {
  fetch(`https://api.spotify.com/v1/shows/${id}` + '?market=US', {
    method: 'GET',
    headers: {
      "Authorization": token,
      "Accept": 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      let header_html = `
      <img src= '${data.images[1].url}'/>
        <div class="header_detail">
            <h5>Podcast</h5>
            <h2>${data.name}</h2>
            <h5>${data.publisher}</h5>
        </div>
      </div>
      `;
      document.querySelector('.header').innerHTML = header_html;
    });
}


