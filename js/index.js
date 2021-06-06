let token =
  'Bearer BQCFn4Bs0urI9D-IjtjTZgfC-DWTWT0zqie5HYtOWXtLMYHxcvVY_RB42RcHBiSxq7CmdxjS5Ymg6IbwZ3nnpBiLheKpKYlTodk8ChKlRvoI-D6LeXj-nBq4lKuN4L-fHTUgNIX-hxuvrRe_bmeZvCO9X7KJrCZDco4-15u0F-vGVliWpYxcJk1ZolokzcnGyrYzhuDy-Na_dsqsE_P3Xx7PSwnu26OmJ8FXJKJin6K_lETwxYoFMzJ_JMliYc1knynONJMBlJOIh2IKIG-PAHeYPl3F7HE6oWjScb-G';

let url = 'https://api.spotify.com/v1/shows';

function fetch_featured() {
  let show_id = '3rwr9GdoHxMWF8yZhsBzHn';
  fetch(url + '?ids=' + show_id + '&market=US', {
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
  fetch(url + '?ids=' + show_ids + '&market=US', {
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
