
//api.openweathermap.org/data/2.5/weather?id={city id}&appid={API key}

const param = {
    "url": "https://api.openweathermap.org/data/2.5/",
    "appid": "39a81f463f0bd15b2d3bd44531a9b970",
    "urlapiprivat": "https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11"
}

const cities = {
    703448: "Kyiv",
    706483: "Kharkiv",
    702550: "Lviv",
    709930: "Dnipro",
    698740: "Odessa",
    692194: "Sumy",
}

const valuta = {
    703448: "Kyiv",
    706483: "Kharkiv",
    702550: "Lviv",
    709930: "Dnipro",
    698740: "Odessa",
    692194: "Sumy",
}


let TempEl = '';
for (let key in cities) {
    TempEl = document.createElement('option');
    TempEl.setAttribute('value', key);
    TempEl.innerHTML = cities[key];
    document.querySelector('select.city').append(TempEl);
}


function getWeather() {

    const cityId = document.querySelector('select.city').value;

    document.querySelector('div.idTown').textContent = `ID города: ${cityId}`;

    fetch(`${param.url}weather?id=${cityId}&units=metric&APPID=${param.appid}`)
        .then(weather => {
            return weather.json();
        }).then(showWeather);

}


function getValuta(i) {

    fetch("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5")
    fetch(param.urlapiprivat)
        .then(valuta1 => valuta1.json())
        .then(valuta2 => {
            document.querySelector('div.CurVal').innerHTML = `Валюта: ${valuta2[i].ccy}`;
            document.querySelector('div.buy').innerHTML = `Покупка: ${valuta2[i].buy}`;
            document.querySelector('div.sale').innerHTML = `Продажа: ${valuta2[i].sale}`;
        });
}

function showWeather(data) {
    document.querySelector('div.temp').innerHTML = `Температура: ${Math.round(data.main.temp)}&deg;`;
    document.querySelector('div.humid').innerHTML = `Влажность: ${data.main.humidity} %`;
    document.querySelector('div.pressure').innerHTML = `Давление: ${Math.round(data.main.pressure / 1.33)} мм.р.с.`;
    document.querySelector('div.clouds').innerHTML = `Облачность: ${data.weather[0].main} `;
    document.querySelector('div.iconka').innerHTML = `Иконка погоды`;
    document.querySelector('div.ico img').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}


getWeather();
document.querySelector('select.city').onchange = getWeather;

getValuta(0);
document.querySelector('button.btnusd').onclick = () => getValuta(0);
document.querySelector('button.eur').onclick = () => getValuta(1);
document.querySelector('button.rur').onclick = () => getValuta(2);


function b1() {
    document.querySelector('div.rur1').textContent = document.querySelector('input.USD2').value;
}

document.querySelector('button.btn').onclick = b1;


// document.querySelector('button.USD').onclick = showValuta()





