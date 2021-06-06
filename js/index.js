let token =
  'Bearer BQCKI38vYHsdVRBl_Xw_QaiR-Oz_S3saFDh57SNZCTrDfdeQdPVVT6kH0Xg5WASSoAfHmIDSeWHsoVmuapWBq6It7Sp_ot_EiQELrwJ6Bvol4FTGSKjJgKawE0uAuVHOfKdFtCgiiIQ5pJuSUEoUBhJ4A70H6hAocnNgNVQL91GqL5Pmd0H5YJOiC9EWdJYjbFg73lKoDO62TpnngGeZ_v-tq1SfnUgeUpTpxuDVnzxS5aHQ5gy8DpP9Du63_TAemD0Kll_aqmmsV4Gtefev5qmr8hpb90SRutdV0cFg';

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
        <div class="show" onclick='location.href="${show.external_urls.spotify}"'>
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
      Authorization: token,
      Accept: ' application/json',
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

function fetch_episodesInaShow() {
  let show_id = '3rwr9GdoHxMWF8yZhsBzHn';
  let all_episodes_url = `https://api.spotify.com/v1/shows/${show_id}/episodes`;
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
      data.items.forEach((item) => {
        let item_html = `
          <div class="episode"> 
              <img src="${item.images[1].url}"/>
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
        document.querySelector('.episodes').innerHTML += item_html;
      });
    });
}
