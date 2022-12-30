const countryBox = document.querySelector('.country');
const search = document.querySelector('input');
const drop = document.querySelector('.dropdown');
const select  = drop.querySelector('.select');
const menu = drop.querySelector('.menu');
const caretTreanlge = document.querySelector('.caret');
const li = document.getElementsByTagName('li');
let data = [];
let htmldata = [];
const body = document.body;

window.addEventListener('DOMContentLoaded', () => {
    let load = document.querySelector('.loader-wrapper')
    setTimeout(() => {
        load.style.opacity = '0';
        load.style.display = 'none'
        body.style.overflow=''
    }, 1000);
})

    body.style.overflow='hidden';


function darkMode() {
  const wasDarkMode = localStorage.getItem("dark-mode") === "true";
  localStorage.setItem("dark-mode", !wasDarkMode);
  body.classList.toggle("dark-mode", !wasDarkMode);
}
document.querySelector(".header-box2").addEventListener("click", darkMode);
function onLoad() {
  body.classList.toggle("dark-mode",(wasDarkMode = localStorage.getItem("dark-mode") === "true")
  );
}
document.addEventListener("DOMContentLoaded", onLoad);

async function getCountry(){
    let url = await fetch('https://restcountries.com/v2/all?fields=name,capital,region,population,flags')
    data = await url.json();
    htmldata = countryInfo(data);
    countryBox.innerHTML = htmldata;
    // console.log(data);
    // console.log(htmldata);
}
getCountry()
function countryInfo(map) {
    let html = '';
    map.forEach(e => {
        let {name,flags:{svg},population,region,capital } = e;
        html += `
            <div class="country-item__info">
                    <div class="country-img">
                          <img src="${undef(svg)}" alt="${name}">
                    </div>
                    <div class="country-info">
                            <h2 class="title">${undef(name)}</h2>
                            <div class="population">Population: ${undef(someZap(population))}</div>
                            <div class="region">Region: ${undef(region)}</div>
                            <div class="capital">Capital: ${undef(capital)}</div>                            
                    </div>
            </div>
        `
    });
    // console.log(html);
    return html;
}
function undef(undef){
    return undef ? undef : 'Not Found'
}

search.addEventListener('input', (e) => {
    let value = e.target.value.toLowerCase()
    if(value.length < 1){
        countryBox.innerHTML = htmldata
    }else{
        removeActive(li);
        li[0].classList.add('active');
        document.querySelector('.selected').innerHTML = 'All';

        let sortMass = [];
        for(let x of data){
            let {name} = x;
            if(name.toLowerCase().startsWith(value)){
                sortMass.push(x)
                // console.log(sortMass);
            }
        }
        countryBox.innerHTML = countryInfo(sortMass)
        
    }
})

drop.addEventListener('click', () => {
    menu.classList.toggle('menu-open');
    caretTreanlge.classList.toggle('caret-rotate');
});

for(let v of li){
    v.addEventListener('click', function() {
        removeActive(li);
        this.classList.add('active');
        document.querySelector('.selected').innerText = this.innerText;
        sortFromRegion(v.innerText,data)
        // console.log(v.innerText,data);
    })
}

function removeActive(lis){
    for(let b of lis){
        b.classList.remove('active')
        // console.log(b);
    }
}
function sortFromRegion(selectreg,data){
    if(selectreg === 'All'){
        countryBox.innerHTML = htmldata
    }else{
        let sortMass = [];
        for(let a of data){
            let {region} = a;
            if(region === selectreg){
                sortMass.push(a)
                // console.log(sortMass);
             }
        }
        countryBox.innerHTML = countryInfo(sortMass)
    }
}

function someZap(number){
    let arr = [];
    let str = '';
    let str2 = number.toString().split('').reverse().join('');
    for(let i = 0; i< str2.length; i++){
        str += str2[i];
        if(str.length === 3) {
            arr.push(str.split('').reverse().join(''));
            str = '';
        }else if(str.length !== 3 && str !== '' && i == str2.length - 1){
            arr.push(str.split('').reverse().join(''));
        }
    }
    return arr.reverse().join();
}