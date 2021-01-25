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
        // create start and end date time arrays by splitting at spaces
        var startDateArray = t.start_date_time.split(' ');
        var month = startDateArray[1];
        // use today date compared to end date and registration_open status to determine button used in training record
        // NOTE: this is really meant to catch any courses that haven't been updated properly in the api, so the user doesn't
        // see innaccurate information on the education page.
  
        // urlize the title to be added after hash in url; regex replaces characters with one hyphen
        // first 8 characters of training id added just in case there is a url title conflict (same course more than once in same month & yr)
        record.innerHTML =
          `
          <li class="post" data-category=${t.title}>
          <article>
            <figure>
            <img src=${t.title} alt=${t.title}>
              </a>
              <figcaption>
                <ol class="post-categories">
                  <li>
                    <a href="">${t.title}</a>
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
      // update header in template to include "(year) Course Schedule" if there are any public records
      // otherwise input empty string in header tag
      var headerText = data.count > 0 ? `${data.results[0].year} Course Schedule` : ``;
      document.getElementById('education-schedule-h2').innerText = headerText;
    })
  }
  
  // get training records from tnris api to create categories filter of courses
  // inject category filter into html; append html to template html
  // this action is performed in a separate function so that the retrieveTraining()
  // function remains independent and can be re-used when filter applied
  function retrieveTrainingCategories() {
    var trainingUrl = 'https://api.tnris.org/api/v1/tnris_org/training';
    return fetch(trainingUrl).then(function(response) {
      if (!response.ok) {
        throw new Error('Could not retrieve TNRIS API response for training events.');
      }
      return response.json();
    })
    .then(function(data) {
      // set aside categories array for creating unique list from courses
      var categories = [];
      // iterate over array of objects in response and do the stuff
      data.results.forEach(function(t) {
        // if course category not in array, add it
        if (!categories.includes(t.category)) {
          categories.push(t.category);
        }
      });
  
      // loop unique categories array to add options to filter dropdown
      categories.sort().forEach((c) => {
        var cat = document.createElement('li');
        cat.innerHTML = c;
        cat.setAttribute('class', 'category-dropdown-menu-item');
        document.getElementById('category-dropdown-menu').appendChild(cat);
      });
    })
    .then(function() {
      // add event listerner to all category-dropdown-menu-item li tags so onclick
      // filters displayed courses
      var menuItems = document.querySelectorAll(".category-dropdown-menu-item");
  
      menuItems.forEach(function(i) {
        i.addEventListener("click", function() {
          // update dropdown to display chosen filter
          document.getElementById("selected-category-filter").innerHTML = i.innerHTML;
          // clear all courses which were injected into the training-list
          document.getElementById("insert-here").innerHTML = "";
          // re-retrieve the trainings with chosen filter applied to api call as query
          i.innerHTML === 'All Courses' ? retrieveTraining() : retrieveTraining('category', i.innerHTML);
        });
      });
    })
  }
  
  
  // run functions when on education page
  if (location.pathname.includes('/pipeline')) {
    retrieveTraining();
    retrieveTrainingCategories();
  }
  