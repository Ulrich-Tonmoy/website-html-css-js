function ageInDays(){
    var birthYear = prompt('what year were you born...?');
    var ageInDayss = (2019-birthYear)*365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are ' + ageInDayss + 'days old.');
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}
function reset(){
    document.getElementById('ageInDays').remove();
}
function generate(){
    var image=document.createElement("img");
    var div=document.getElementById('flex-box-container-cat');
    image.src="https://thecatapi.com/api/images/get?format=src&type=gif&size+small";
    div.appendChild(image);
}