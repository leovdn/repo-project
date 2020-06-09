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

    const user = inputElement.value;

    if(!user) return;

    axios.get('https://api.github.com/users/' + user + '/repos')
        .then(function (res) {
            showRepos(res.data);
        })
}


function smoothScroll() {
    var smooth = document.getElementById('list');
    smooth.scrollIntoView({block: "start", behavior: "smooth"});  
}


function startAnimateScroll() {
    const sections = document.querySelectorAll('[data-anime="scroll"]');

    if (sections.length) {
        const windowHalf = window.innerHeight * 0.7;

        function animemateScroll() {
            sections.forEach((section) => {
                const sectionTop = section.getBoundingClientRect().top;
                const isSectionVisible = (sectionTop - windowHalf) < 0;
                if (isSectionVisible) {
                    section.classList.add('active');
                }
            })
        }
        animemateScroll();
        window.addEventListener('scroll', animemateScroll);
    }
}
