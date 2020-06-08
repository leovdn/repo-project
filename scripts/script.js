const listElement = document.querySelector('ul');
const inputElement = document.querySelector('input');
const btnElement = document.querySelector('.btn');

btnElement.addEventListener('click', listRepos);

function showRepos(repos) {
    listElement.innerHTML = "";
    for (repo of repos) {
        const textElement = document.createTextNode(repo.name);
        const liElement = document.createElement('li');

        liElement.appendChild(textElement);
        listElement.appendChild(liElement);
    }
}

function listRepos() {
    var smooth = document.getElementById('list');
    smooth.scrollIntoView({block: "start", behavior: "smooth"});  
    const user = inputElement.value;

    if(!user) return;

    axios.get('https://api.github.com/users/' + user + '/repos')
        .then(function (res) {
            showRepos(res.data);
        })
}

