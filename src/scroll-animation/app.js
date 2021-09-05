const balloon = document.getElementById('air-balloon');
const cloudOne = document.getElementById('cloud-one');
const cloudTwo = document.getElementById('cloud-two');
const cloudThree = document.getElementById('cloud-three');
const cloudFour = document.getElementById('cloud-four');
const cloudFive = document.getElementById('cloud-five');
const js = document.getElementById('js');
const react = document.getElementById('react');
const gql = document.getElementById('gql');

function move() {
    const inc = window.scrollY;

    balloon.style.bottom = 10 + inc * 0.1 + '%';
    cloudOne.style.bottom = 40 + inc * 0.12 + '%';
    cloudOne.style.left = 75 + inc * 0.1 + '%';
    cloudTwo.style.bottom = 80 + inc * 0.14 + '%';
    cloudTwo.style.left = 70 + inc * 0.15 + '%';
    cloudThree.style.bottom = 60 + inc * 0.1 + '%';
    cloudThree.style.left = 0 + inc * -0.12 + '%';
    cloudFour.style.bottom = 70 + inc * 0.16 + '%';
    cloudFour.style.left = 20 + inc * -0.15 + '%';
    cloudFive.style.bottom = 60 + inc * 0.2 + '%';
    cloudFive.style.left = 60 + inc * 0.16 + '%';
    js.style.left = 20 + inc * -2.2 + '%';
    react.style.left = 26 + inc * -1.5 + '%';
    gql.style.left = 32 + inc * -1 + '%';
}

window.addEventListener('scroll', move)