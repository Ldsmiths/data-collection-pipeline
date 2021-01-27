// get training records from tnris api
// inject training records into html; append html to template html
function retrieveTraining(queryField, queryValue) {
    var trainingUrl = 'https://api.tnris.org/api/v1/tnris_org/training';
    if (queryField) {
      trainingUrl = trainingUrl + "?" + queryField + "=" + queryValue;
    }
    return fetch(trainingUrl).then(function(response) {
      if (!response.ok) {
        throw new Error('Could not retrieve TNRIS API response for training events.');
      }
      return response.json();
    })
    .then(function(data) {
      data.results.forEach(function(t) {
        // use api values to create clean variables to use in html below
        var record = document.createElement('div');

        record.innerHTML =
          `
          <li class="post" data-category=${t.category}>
          <article>
            <figure>
            <img src=${t.title} alt=${t.title}>
              </a>
              <figcaption>
                <ol class="post-categories">
                  <li>
                    <a href="">${t.category}</a>
                  </li>
                </ol>
                <h2 class="post-title">
                ${t.title}
                  </a>
                </h2><small>#${t.title}</small><br><br>
                ${t.title}<br><br>
                <b><u>Funding:</u></b> <small>${t.title}</small>
                <br><br>
                <a href="${t.title}" target="_blank"><button>More Info</button></a>
              </figcaption>
            </figure>
          </article>
        </li>  
  
        `;
  
        document.getElementById('insert-here').appendChild(record);
      });
    })
  }
  
  // run functions when on pipeline page
  if (location.pathname.includes('/pipeline')) {
    retrieveTraining();
  }
  


$(document).ready(function () {
  
    $("body").tooltip({   
      selector: "[data-toggle='tooltip']",
      container: "body"
    })
      .popover({
      selector: "[data-toggle='popover']",
      container: "body",
      html: true
    });
    
  });