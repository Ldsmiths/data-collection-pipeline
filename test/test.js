var tasks = [{
    "title": "Project Title",
    "status": "Awarded",
    "description": "Brief description of project details lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
},
{
    "title": "Project Title 2",
    "status": "Post-Processing",
    "description": "Brief description of project details lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
}
];

let cardContainer;

let createTaskCard = (task) => {

let card = document.createElement('li');
card.className = 'post';

let cardBody = document.createElement('div');
cardBody.className = 'card-body';

let title = document.createElement('h2');
title.innerText = task.title;
title.className = 'post-title';

let status = document.createElement('div');
status.innerText = task.status;
status.categoryName = task.status;


let description = document.createElement('p');
description.innerText = task.description;


cardBody.appendChild(title);
cardBody.appendChild(status);
cardBody.appendChild(description);
card.appendChild(cardBody);
cardContainer.appendChild(card);

}

let initListOfTasks = () => {
if (cardContainer) {
    document.getElementById('card-container').replaceWith(cardContainer);
    return;
}

cardContainer = document.getElementById('card-container');
tasks.forEach((task) => {
    createTaskCard(task);
});
};

initListOfTasks();