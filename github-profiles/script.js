const APIURL = "https://api.github.com/users/";
const GITHUB = "https://github.com/";

const main = document.querySelector('main');
const form = document.querySelector('form');
const search = document.querySelector('#search');

getUser("ulrich-tonmoy");

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = search.value;
    if (username) {
        getUser(username);
        search.value = '';
    }
});

async function getUser(username) {
    const resp = await fetch(APIURL + username);
    const respData = await resp.json();

    createUserCard(respData, username);

    getRepos(username);
}

async function getRepos(username) {
    const resp = await fetch(APIURL + username + "/repos");
    const respData = await resp.json();

    addReposToCard(respData, username);
}


function createUserCard(user, username) {
    const card = `<div class="card">
                        <div>
                            <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
                        </div>
                        <div class="user-info">
                            <h2 class="name">${user.name}</h2>
                            <p>${user.bio ? user.bio : ''}</p>

                            <ul class="info">
                                <li>${user.followers}<strong>Followers</strong></li>
                                <li>${user.following}<strong>Following</strong></li>
                                <li>${user.public_repos}<strong>Repos</strong></li>
                            </ul>

                            <div id="repos"></div>
                        </div>
                    </div>`;

    main.innerHTML = card;


    const avatar = main.querySelector('.avatar');
    const name = main.querySelector('.name');
    avatar.addEventListener('click', () => {
        // window.location = GITHUB + username;
        window.open(GITHUB + username);
    });
    name.addEventListener('click', () => {
        window.location = GITHUB + username;
        // window.open(GITHUB + username);
    });
}

function addReposToCard(repos, username) {
    const reposElement = document.getElementById('repos');

    // repos.sort((a, b) => a.stargazers_count - b.stargazers_count).slice(0, 9).forEach(repo => {
    // repos.sort((a, b) => a.stargazers_count - b.stargazers_count).forEach(repo => {
    repos.forEach(repo => {
        const repoElement = document.createElement('span');
        repoElement.classList.add('repo');
        repoElement.href = repo.html_url;
        repoElement.target = "_blank";
        repoElement.innerText = repo.name;

        reposElement.appendChild(repoElement);
    });
}