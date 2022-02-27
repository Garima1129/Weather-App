let text=document.querySelector("input");
let btn=document.getElementById("btn");
let weather=document.getElementById("weather");
let loc=document.getElementById("location");
let speed=document.getElementById("speed");
let temp=document.getElementById("temp");
let minmax=document.getElementById("minmax");
let time=document.getElementById("time");

let backgroundImage = document.getElementById("backgroundImage");

start();
function start(){
    getweather("london")
}

btn.addEventListener("click",(e)=>{
    e.preventDefault();
    let input=text.value;
    getweather(input);
    text.value="";
});


function getweather(input){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=cc7b365cdf72c6b1736b020dc6c87432`)
    .then((result)=>{
        return result.json()
    })
    .then((data)=>{

        let txt=data.weather[0].description;

        changeBackground(txt);

        weather.innerHTML=txt;
        txt=data.sys.country;
        loc.innerHTML=input.toUpperCase()+','+txt;
        txt=data.wind.speed;
        speed.innerHTML=txt+" kms";
        txt=parseInt(data.main.temp-273);
        temp.innerHTML=txt+"*C";
        txt=parseInt(data.main.temp_min-273);
        let txt2=parseInt(data.main.temp_max-273);
        minmax.innerHTML=txt+"*C(min) / "+txt2+"*C(max)";
        txt=new Date(data.dt).toDateString();
        time.innerHTML=txt;
    


    })
    .catch((err)=>{
        alert("Enter Valid Name");
        console.log(err.message);
    });


}

function changeBackground(txt){
    console.log(txt);

    fetch(`https://api.unsplash.com/search/photos?client_id=LSYH9ycs9LljnaEIH0B2Lqn7aVmpxnM1WYB0HF6AhGY&query=${txt}&per_page=10`).
    then((result)=>{
        return result.json();
    }).then((data)=>{
        let index = Math.floor(Math.random() * 10);
        console.log(data.results[index]);
        backgroundImage.src=`${data.results[index].urls.regular}`;
    });

}