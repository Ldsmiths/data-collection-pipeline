projects = [
    {
        name: "Orthoimagery Acquisition - Brazos",
        id: "580150827",
        img: "https://data.tnris.org/beb4837b-9ed1-4d25-8942-8c3007e45230/assets/3954813d-ece2-4897-94b0-c8b871804bfa.jpg",
        alt: "test",
        status: "Awarded",
        display: "Awarded",
        description: "An area of interest (AOI) for the collection of high resolution Orthoimagery data was identified based on interest from the local community to refresh Brazos County with new aerial imagery. The project data will be used by the Brazos partners and others for a variety of mapping applications such as: appraisal district valuations, university facilities management, infrastructure mapping, and other applications.",
        link: "https://user-images.githubusercontent.com/4921113/105534143-ac533380-5cb2-11eb-9fc5-1d86864dbf1f.png",
        fund: "Brazos Central Appraisal, Bryan Texas Utilities, City of Bryan, City of College Station, City of Palestine, Texas A&M University, Texas Municipal Power Agency",
        solicitation: "1",
    },
    {
        name: "Project 2",
        img: "https://data.tnris.org/117cf9e1-3b1e-48f2-97a3-47020d871035/assets/a0daf79b-8330-4783-88ab-d9ba37255e2c.jpg",
        alt: "test2",
        status: "Acquisition",
        display: "In Acquisition",
        description: "Brief description of project details lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        link: "https://user-images.githubusercontent.com/4921113/105534143-ac533380-5cb2-11eb-9fc5-1d86864dbf1f.png"
    }
]

projects.forEach(project => {
	var ul = document.querySelector('ul')
  
	ul.innerHTML = ul.innerHTML + `
    <li class="post" data-category=${project.status}>
    <article>
      <figure>
      <img src=${project.img} alt=${project.alt}>
        </a>
        <figcaption>
          <ol class="post-categories">
            <li>
              <a href="">${project.display}</a>
            </li>
          </ol>
          <h2 class="post-title">
          ${project.name}
            </a>
          </h2><small>#${project.id}</small><br><br>
          ${project.description}<br><br>
          <b><u>Funding:</u></b> <small>${project.fund}</small>
          <br><br>
          <a href="${project.link}" target="_blank"><button>More Info</button></a>
        </figcaption>
      </figure>
    </article>
  </li>  
  `
})




