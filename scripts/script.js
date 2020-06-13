const listElement = document.querySelector('ul');
const inputElement = document.querySelector('input');
const btnElement = document.querySelector('.btn');


btnElement.addEventListener('click', smoothScroll);
btnElement.addEventListener('click', listRepos);
btnElement.addEventListener('click', showList);

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
    function smooth(){
        var smooth = document.getElementById('repo-list');
        smooth.scrollIntoView({block: "start", behavior: "smooth"});  
    }
    setTimeout(smooth, 400);
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

function showList() {
    var display = document.getElementById('repo-list').style.display;
    if (inputElement.value == "") {
        document.getElementById('repo-list').style.display = 'none';
    } else if (display == "none" && inputElement.value !== "") {
      document.getElementById('repo-list').style.display = 'block';
    } 
}

window.onscroll = function() {this.fixedSearch()};

const search = document.getElementById('search');
const searchContainer = document.getElementById('search-hide');
const searchFixed = search.offsetTop;

function fixedSearch() {
    if(window.pageYOffset > searchFixed) {
        search.classList.add('search-fixed');
        searchContainer.classList.add('search-container-hide')
    } else {
        search.classList.remove('search-fixed');
        searchContainer.classList.remove('search-container-hide')
    }
}
