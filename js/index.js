let token =
  'Bearer BQBle6eOrI9y3_H9KJHyS3egx3NkJXfoVN0mYKOyPQTyfcmFIHqMrYxFc-5i1IKw5xteJrEP1pmowQbdayqq4gmZbHcK5RLhGNdJsi36iYy-KgjS4TOa9eZiJj9s53FFYTN9piuA-YoFuXbGpTEUiUuHOJUjv2bV9I8USL_EiYhLgUSyKHPu08aI1itHoNk_4m0DQTV0EUDXzqo_9uM_iDm3L92ULiV0xuoThXLLc8DSXj7Juzmsj3ojWfArcEI268olD-K3USbrmD_2LrSCCdWA1I_7tLyK0_0Iq0hp';

let show_url = 'https://api.spotify.com/v1/shows';
let episodes_url = '	https://api.spotify.com/v1/episodes';

function fetch_featured() {
  let show_id = '3rwr9GdoHxMWF8yZhsBzHn';
  fetch(show_url + '?ids=' + show_id + '&market=US', {
    method: 'GET',
    headers: {
      Authorization: token,
      Accept: 'application/json',
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
      Authorization: token,
      Accept: 'application/json',
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

function fetch_episodesInaShow(id) {
  let all_episodes_url = `https://api.spotify.com/v1/shows/${id}/episodes`;
  fetch(all_episodes_url + '?market=US&limit=10&offset=0', {
    method: 'GET',
    headers: {
      Authorization: token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      data.items.forEach((episode) => {
        let episode_html = `
          <div class="episode">
            <img src="${episode.images[1].url}">

            <div class="episode__details">
              <h2>${episode.name}</h2>
            </div>

            <div class="audio">
                <div class="play__button">
                  <audio src="${episode.audio_preview_url}" controls></audio>
                </div>
                <h4>preview</h4>
              </div>
          </div>
        `;
        document.querySelector('.episodes').innerHTML += episode_html;
      });
    });
}

function getShow(id) {
  fetch(`https://api.spotify.com/v1/shows/${id}` + '?market=US', {
    method: 'GET',
    headers: {
      Authorization: token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      document.title = 'pod - ' + data.name;
      let header_html = `
      <img src= '${data.images[1].url}'/>
        <div>
            <h5>Podcast</h5>
            <h2>${data.name}</h2>
            <h4>${data.publisher}</h4>
        </div>
      </div>
      `;
      document.querySelector('.detail__header').innerHTML = header_html;
    });
}
