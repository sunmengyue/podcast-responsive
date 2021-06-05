let token =
  'Bearer BQDjbWjxgy6HaahCn17DPZGhYMTK4WFejWmjOaYCX_FVqb-mEDT0ZeJpKLSQu16XC5G1DMUYLeF3rim4DZHMj6q3mH3YkFe0iFW7mdTpXhX8uLAql16ue-ecFwWwCKGi5EnRejuYF4buDCDLYCGoRsFhbUz7nSTO2vFx-H9KEwwPQieVMuJUeYpoTGnnLGo_LTVXP1C0HQqrrabXx-3gJuzKWeYdl2JgVPHInjorDcWK04kEccf2QbGwEhyIkgdVSK421Uc0UJ4w2CuDU1fmZgG2QeXHaN01mKlpQDDB';

let url = 'https://api.spotify.com/v1/shows';

function fetch_featured() {
  let show_id = '5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ';
  fetch(url + '?ids=' + show_id + '&market=US', {
    method: 'GET',
    headers: {
      Authorization: token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((data) => data.json())
    .then((data) => {
      let show = data.shows[0];
      let featured_html = `
      <div class="featured">
          <img src=${show.images[1].url}/>
          <div>
            <h2>${show.name}</h2>
            <h4>${show.description}</h4>
            <h3>Don't forget to listen to today's episode</h3>
            <button>Listen Now</button>
          </div>
      </div>
    `;
      document.getElementById('featured').innerHTML = featured_html;
    })

    .catch(console.log);
}
