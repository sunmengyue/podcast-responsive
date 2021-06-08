let token =
  'Bearer BQBh--_H_EJQQKj9G9rpREgunq48sOrVrnvRc9HEcqcvpAHaVM-rICtrTUSOmgLnE-fs36wxx1vooifKZoNiLAoFbYT2LXuJb7tB2ichocjnWRLrB5Lr-3G5r6tCMELEiWQGY0VbArQPfJ6vbQsIbIFSPvEUB5B9dpqEXY4qeLQXZjyNonJpEDdKQB9Ms9QIf43YwkfqwCO8ScfG3Jm5tpWGPFoLSydVofc1gNSgUMC4LUoUxoQPXviSDXXSHtCKpFCTNnM-gCBrXHqJX-FCV-pQXXfeXKVlbbRnVeXG';

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

      let sticky_content_html = `
        <h3>${data.name}</h3>
      `;

      document.querySelector('.detail__header').innerHTML = header_html;
      document.querySelector('.sticky__header').innerHTML = sticky_content_html;
    });
}
