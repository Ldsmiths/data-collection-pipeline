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
  

/*
  We can use [body] or the element class/id that wraps the elements with tooltip/popover.
  Include the data-[] attribute in each element that needs it.
*/
$(document).ready(function () {
    //can also be wrapped with:
    //1. $(function () {...});
    //2. $(window).load(function () {...});
    //3. Or your own custom named function block.
    //It's better to wrap it.
  
    //Tooltip, activated by hover event
    $("body").tooltip({   
      selector: "[data-toggle='tooltip']",
      container: "body"
    })
      //Popover, activated by clicking
      .popover({
      selector: "[data-toggle='popover']",
      container: "body",
      html: true
    });
    //They can be chained like the example above (when using the same selector).
    
  });