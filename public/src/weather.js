//Selecting elements...
let shortMsgCross = document.getElementById("cross");
let cityNameErrorCross = document.getElementById("cross2")
let shortTimeMsg = document.getElementById("shortTimeMsg")
let searchBar = document.getElementById("searchBar")
let searchBTN = document.getElementById("searchBTN")
let latitude = document.getElementById("lat")
let longitude = document.getElementById("lon")
let weatherStatus = document.getElementById("wed_status")
let temp = document.getElementById("tempData")
let maxTemperature = document.getElementById("max")
let minTemperature = document.getElementById("min")
let tempFeelsLike = document.getElementById("feelsLike")
let Humidity = document.getElementById("humidity")
let pressure = document.getElementById("press")
let wind = document.getElementById("wind")
let weather_icon = document.getElementById("weather-icon")
let day1Temp = document.getElementById("day1")
let day2Temp = document.getElementById("day2")
let day3Temp = document.getElementById("day3")
let day4Temp = document.getElementById("day4")
let day5Temp = document.getElementById("day5")
let day6Temp = document.getElementById("day6")
let day7Temp = document.getElementById("day7")
let day1TempL = document.getElementById("day1-L")
let day2TempL = document.getElementById("day2-L")
let day3TempL = document.getElementById("day3-L")
let day4TempL = document.getElementById("day4-L")
let day5TempL = document.getElementById("day5-L")
let day6TempL = document.getElementById("day6-L")
let day7TempL = document.getElementById("day7-L")
// //Variables...
let date = new Date()
let cityName = ""
const API_KEY = "86d6b0edaf026c4efc0e9aa5f74d9f75"


//Cross BTN function...
shortMsgCross.addEventListener('click', () => {
    shortTimeMsg.style.animationFillMode = "none"
})
cityNameErrorCross.addEventListener("click", () => {
    document.getElementById("cityNameError").style.display = "none"
})



//Geo Location weather status
let loc = document.getElementById("location-ico");

function geoLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById("location-txt").innerHTML = "Location is not supported by this device"
    }
}

async function showPosition(position) {
    document.getElementById("cityNameError").style.display = "none"
    let geoLat = position.coords.latitude;
    let geoLon = position.coords.longitude;
    console.log("Lat and lon : " + geoLat + geoLon)
    try {
        document.getElementById("loadingbar").style.display = "block"
        let geoApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${geoLat}&lon=${geoLon}&exclude=hourly,minutely&units=metric&appid=86d6b0edaf026c4efc0e9aa5f74d9f75`
        let geoAPiFetch = await fetch(geoApiUrl)
        let geoLocationJson = await geoAPiFetch.json();
        let geoLocationOfDevce = [geoLocationJson];
        console.log(geoLocationOfDevce)

        //City Name : 
        let url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${geoLat}&lon=${geoLon}&limit=1&appid=${API_KEY}`
        let timeAPI = `http://worldtimeapi.org/api/timezone/Asia/Kolkata`
        let response = await fetch(url)
        let responseJson = await response.json()
        let dataArr = [responseJson]
        // console.log(dataArr)
        cityName = dataArr[0][0].name
        let cityState = dataArr[0][0].state
        document.getElementById('cityName').innerText = `${cityName},${dataArr[0][0].country}`
        document.getElementById("stateName").innerText = cityState
        let TimeAPiFetcher = await fetch(timeAPI)
        let timeApiJson = await TimeAPiFetcher.json()
        let timeAPIData = [timeApiJson]
        console.log("API", timeAPIData)

        //Latitude
        latitude.innerText = await geoLat
        latitude.style.color = "white"
        //Longitude
        longitude.innerText = await geoLon
        longitude.style.color = "white"
        //Status
        weatherStatus.innerText = await geoLocationOfDevce[0].current.weather[0].description
        //Temperature
        let cityTempInFloat = await geoLocationOfDevce[0].current.temp
        let cityTemp = Math.round(cityTempInFloat)
        temp.innerText = cityTemp
        //Status Icon


        //Max And Min temp
        let maxTempFloat = await geoLocationOfDevce[0].daily[0].temp.max
        let minTempFloat = await geoLocationOfDevce[0].daily[0].temp.min
        let maxTemp = Math.round(maxTempFloat)
        let minTemp = Math.round(minTempFloat)
        //console.log("Hiii" + minTempFloat + maxTemp)
        maxTemperature.innerText = maxTemp
        minTemperature.innerText = minTemp

        //Feels like
        let feelsLikeFloat = await geoLocationOfDevce[0].current.feels_like
        tempFeelsLike.innerText = `${Math.round(feelsLikeFloat)} °c`

        //Humidity
        let humidityFloat = await geoLocationOfDevce[0].current.humidity
        Humidity.innerText = `${Math.round(humidityFloat)} %`

        //Pressure
        let pressureData = await geoLocationOfDevce[0].current.pressure
        pressure.innerText = `${pressureData} mb`

        //Wind
        let windSpeed = await geoLocationOfDevce[0].current.wind_speed
        let windDeg = geoLocationOfDevce[0].current.wind_deg
        wind.innerText = `${windSpeed} km/h (${windDeg}°)`


        //part 1 : get time status... 
        let cityTimeDt = await geoLocationOfDevce[0].current.dt
        let citySunrise = await geoLocationOfDevce[0].current.sunrise
        let citySunset = await geoLocationOfDevce[0].current.sunset
        var currentTimeStatus = ""
        if (cityTimeDt > citySunrise && cityTimeDt < citySunset) {
            //console.log("Day")
            currentTimeStatus = "Day"
        } else if (cityTimeDt > citySunset && cityTimeDt > citySunrise) {
            //console.log("Night")
            currentTimeStatus = "Night"
        } else if (cityTimeDt < citySunrise && cityTimeDt < citySunset) {
            //console.log("Mid Night")
            currentTimeStatus = "Night"
        }

        //part 2 : Weather status 
        var city_weather_status = geoLocationOfDevce[0].current.weather[0].description
        // console.log(city_weather_status)

        // 1) Clouds................................................................................................................................
        //Night part
        if (city_weather_status === "overcast clouds" && currentTimeStatus === "Night") {
            //console.log("perfect")
            weather_icon.src = "./Assests/weather/64x64/night/122.png"

            document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.body.style.background = "url(./Assests/WeatherBgs/overcust-cloud-1.PNG) fixed no-repeat center center"
            document.body.style.backgroundSize = "cover"
            //nav
            document.querySelector("#nav").style.backgroundColor = "#00000031"
            //Search
            document.querySelector("#searchBarBody").style.backgroundColor = "#00000033"
            document.querySelector("#searchBar").style.backgroundColor = "Transparent"

            //Top
            document.querySelector(".date_week").style.backgroundColor = "#00000033"
            document.getElementById("weather_status").style.backgroundColor = "#00000033"
            document.getElementById("min-max-temp").style.backgroundColor = "#00000033"
            //Bottom
            document.querySelector(".details").style.backgroundColor = "#062c5d00"
            document.querySelector(".weatherfeild").style.backgroundColor = "#062c5d00"
            document.querySelector(".otherdetailsfeeild").style.backgroundColor = "#062c5d00"

            //MORE DETAILS
            document.querySelector(".moreDetailsHead").style.backgroundColor = "#00000033"
            document.querySelector(".moreDetailsbody").style.backgroundColor = "#062c5d00"

        } else if (city_weather_status === "broken clouds" && currentTimeStatus === "Night") {
            weather_icon.src = "./Assests/weather/64x64/night/119.png"
            document.body.style.background = "url(./Assests/WeatherBgs/brokenCloud_night.jpg) fixed no-repeat center center"
            document.body.style.backgroundSize = "cover"
            document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
            //nav
            document.querySelector("#nav").style.backgroundColor = "#0000001c"
            //Search
            document.querySelector("#searchBarBody").style.backgroundColor = "#0b295838"
            document.querySelector("#searchBar").style.backgroundColor = "Transparent"

            //Top
            document.querySelector(".date_week").style.backgroundColor = "#00000033"
            document.getElementById("weather_status").style.backgroundColor = "#00000033"
            document.getElementById("min-max-temp").style.backgroundColor = "#00000033"
            //Bottom
            document.querySelector(".details").style.backgroundColor = "#062c5d00"
            document.querySelector(".weatherfeild").style.backgroundColor = "#062c5d00"
            document.querySelector(".otherdetailsfeeild").style.backgroundColor = "#062c5d00"

            //MORE DETAILS
            document.querySelector(".moreDetailsHead").style.backgroundColor = "#00000033"
            document.querySelector(".moreDetailsbody").style.backgroundColor = "#062c5d00"


        } else if (city_weather_status === "scattered clouds" && currentTimeStatus === "Night") {
            weather_icon.src = "./Assests/weather/64x64/night/143.png"
            document.body.style.background = "url(./Assests/WeatherBgs/scatterdCloud_nightt.jpg) fixed no-repeat center center"
            document.body.style.backgroundSize = "cover"
            document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
            //nav
            document.querySelector("#nav").style.backgroundColor = "#00000031"
            //Search
            document.querySelector("#searchBarBody").style.backgroundColor = "#00000033"
            document.querySelector("#searchBar").style.backgroundColor = "Transparent"

            //Top
            document.querySelector(".date_week").style.backgroundColor = "#00000033"
            document.getElementById("weather_status").style.backgroundColor = "#00000033"
            document.getElementById("min-max-temp").style.backgroundColor = "#00000033"
            //Bottom
            document.querySelector(".details").style.backgroundColor = "#062c5d00"
            document.querySelector(".weatherfeild").style.backgroundColor = "#062c5d00"
            document.querySelector(".otherdetailsfeeild").style.backgroundColor = "#062c5d00"

            //MORE DETAILS
            document.querySelector(".moreDetailsHead").style.backgroundColor = "#00000033"
            document.querySelector(".moreDetailsbody").style.backgroundColor = "#062c5d00"

        } else if (city_weather_status === "few clouds" && currentTimeStatus === "Night") {
            weather_icon.src = "./Assests/weather/64x64/night/116.png"
            document.body.style.background = "url(./Assests/WeatherBgs/Few_clouds.jpg) fixed no-repeat center center"
            document.body.style.backgroundSize = "cover"
            document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"

            //nav
            document.querySelector("#nav").style.backgroundColor = "#0000001c"
            //Search
            document.querySelector("#searchBarBody").style.backgroundColor = "#0b295838"
            document.querySelector("#searchBar").style.backgroundColor = "Transparent"

            //Top
            document.querySelector(".date_week").style.backgroundColor = "#00000033"
            document.getElementById("weather_status").style.backgroundColor = "#00000033"
            document.getElementById("min-max-temp").style.backgroundColor = "#00000033"
            //Bottom
            document.querySelector(".details").style.backgroundColor = "#062c5d00"
            document.querySelector(".weatherfeild").style.backgroundColor = "#062c5d00"
            document.querySelector(".otherdetailsfeeild").style.backgroundColor = "#062c5d00"

            //MORE DETAILS
            document.querySelector(".moreDetailsHead").style.backgroundColor = "#00000033"
            document.querySelector(".moreDetailsbody").style.backgroundColor = "#062c5d00"
        }
        //Clear sky Mode............
        else if (city_weather_status === "clear sky" && currentTimeStatus === "Night") {
            weather_icon.src = "./Assests/weather/64x64/night/113.png"
            document.body.style.background = "url(./Assests/WeatherBgs/clearSky.jpg) fixed no-repeat center center"
            document.body.style.backgroundSize = "cover"
            document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
            //nav
            document.querySelector("#nav").style.backgroundColor = "#00000031"
            //Search
            document.querySelector("#searchBarBody").style.backgroundColor = "#0b295838"
            document.querySelector("#searchBar").style.backgroundColor = "Transparent"

            //Top
            document.querySelector(".date_week").style.backgroundColor = "#00000033"
            document.getElementById("weather_status").style.backgroundColor = "#00000033"
            document.getElementById("min-max-temp").style.backgroundColor = "#00000033"
            //Bottom
            document.querySelector(".details").style.backgroundColor = "#062c5d00"
            document.querySelector(".weatherfeild").style.backgroundColor = "#062c5d00"
            document.querySelector(".otherdetailsfeeild").style.backgroundColor = "#062c5d00"

            //MORE DETAILS
            document.querySelector(".moreDetailsHead").style.backgroundColor = "#00000033"
            document.querySelector(".moreDetailsbody").style.backgroundColor = "#062c5d00"
        }

        // Haze.....................................................................................................................
        else if (city_weather_status === "haze" && currentTimeStatus === "Night") {
            weather_icon.src = "./Assests/weather/64x64/night/248.png"
            console.log("Hmmm")
            document.body.style.background = "url(./Assests/WeatherBgs/haze.jpg) fixed no-repeat center center"
            document.body.style.backgroundSize = "cover"
            document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
            //Top
            document.querySelector(".date_week").style.backgroundColor = "#35334894"
            document.getElementById("weather_status").style.backgroundColor = "#35334894"
            document.getElementById("min-max-temp").style.backgroundColor = " #35334894"
            //Bottom
            document.querySelector(".details").style.backgroundColor = "#062c5d00"
            document.querySelector(".weatherfeild").style.backgroundColor = "#062c5d00"
            document.querySelector(".otherdetailsfeeild").style.backgroundColor = "#062c5d00"
            //MORE DETAILS
            document.querySelector(".moreDetailsHead").style.backgroundColor = "#35334894"
            document.querySelector(".moreDetailsbody").style.backgroundColor = "#062c5d00"
        }

        //Fog.......................................................................................................................
        else if (city_weather_status === "fog" && currentTimeStatus === "Night") {
            weather_icon.src = "./Assests/weather/64x64/night/fog.png"
            document.body.style.background = "url(./Assests/WeatherBgs/nfog.PNG) fixed no-repeat center center"
            document.body.style.backgroundSize = "cover"
            document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
            //nav
            document.querySelector("#nav").style.backgroundColor = "#00000031"
            //Search
            document.querySelector("#searchBarBody").style.backgroundColor = "#0000007d"
            document.querySelector("#searchBar").style.backgroundColor = "Transparent"

            //Top
            document.querySelector(".date_week").style.backgroundColor = "#0000004f"
            document.getElementById("weather_status").style.backgroundColor = "#0000004f"
            document.getElementById("min-max-temp").style.backgroundColor = "#0000004f"
            //Bottom
            document.querySelector(".details").style.backgroundColor = "#00000052"
            document.querySelector(".weatherfeild").style.backgroundColor = "#00000052"
            document.querySelector(".otherdetailsfeeild").style.backgroundColor = "#00000052"

            //MORE DETAILS
            document.querySelector(".moreDetailsHead").style.backgroundColor = "#0000004f"
            document.querySelector(".moreDetailsbody").style.backgroundColor = "#00000052"

        }

        //SNOW.......................................................................................................................
        else if (city_weather_status === "light snow" && currentTimeStatus === "Night" || city_weather_status === "Snow" && currentTimeStatus === "Night") {
            weather_icon.src = "./Assests/weather/64x64/night/179.png"
            document.body.style.background = "url(./Assests/WeatherBgs/nightSnow.jpg) fixed no-repeat center center"
            document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.body.style.backgroundSize = "cover"
        } else if (city_weather_status === "Heavy snow" && currentTimeStatus === "Night") {
            weather_icon.src = "./Assests/weather/64x64/night/338.png"
            document.body.style.background = "url(./Assests/WeatherBgs/nightSnow.jpg) fixed no-repeat center center"
            document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.body.style.backgroundSize = "cover"
        } else if (city_weather_status === "Shower sleet" && currentTimeStatus === "Night" || city_weather_status === "Rain and snow" && currentTimeStatus === "Night" || city_weather_status === "Shower snow" && currentTimeStatus === "Night") {
            weather_icon.src = "./Assests/weather/64x64/night/365.png"
            document.body.style.background = "url(./Assests/WeatherBgs/nightSnow.jpg) fixed no-repeat center center"
            document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.body.style.backgroundSize = "cover"
        }

        //Rain.......................................................................................................................
        else if (city_weather_status === "light rain" && currentTimeStatus === "Night" || city_weather_status === "moderate rain" && currentTimeStatus === "Night" || city_weather_status === "shower rain" && currentTimeStatus === "Night" || city_weather_status === "light intensity shower rain" && currentTimeStatus === "Night") {
            weather_icon.src = "./Assests/weather/64x64/night/305.png"
            document.body.style.background = "url(./Assests/WeatherBgs/rainNight.jpg) fixed no-repeat center center"
            document.body.style.backgroundSize = "cover"
            document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
        } else if (city_weather_status === "heavy intensity rain" && currentTimeStatus === "Night" || city_weather_status === "very heavy rain" && currentTimeStatus === "Night" || city_weather_status === "extreme rain" && currentTimeStatus === "Night" || city_weather_status === "heavy intensity shower rain" && currentTimeStatus === "Night") {
            weather_icon.src = "./Assests/weather/64x64/night/308.png"
            document.body.style.background = "url(./Assests/WeatherBgs/rainNight.jpg) fixed no-repeat center center"
            document.body.style.backgroundSize = "cover"
            document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
        } else if (city_weather_status === "ragged shower rain" && currentTimeStatus === "Night" || city_weather_status === "freezing rain" && currentTimeStatus === "Night") {
            weather_icon.src = "./Assests/weather/64x64/night/359.png"
            document.body.style.background = "url(./Assests/WeatherBgs/rainNight.jpg) fixed no-repeat center center"
            document.body.style.backgroundSize = "cover"
            document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"

        }

        //Thunder Strome.......................................................................................................................
        else if (city_weather_status === "thunderstorm with light rain" && currentTimeStatus === "Night" || city_weather_status === "thunderstorm with rain" && currentTimeStatus === "Night" || city_weather_status === "thunderstorm with heavy rain" && currentTimeStatus === "Night" || city_weather_status === "light thunderstorm" && currentTimeStatus === "Night" || city_weather_status === "	thunderstorm" && currentTimeStatus === "Night" || city_weather_status === "heavy thunderstorm" && currentTimeStatus === "Night" || city_weather_status === "ragged thunderstorm" && currentTimeStatus === "Night" || city_weather_status === "	thunderstorm with drizzle" && currentTimeStatus === "Night" || city_weather_status === "thunderstorm with heavy drizzle" && currentTimeStatus === "Night") {
            weather_icon.src = "./Assests/weather/64x64/night/389.png"
            document.body.style.background = "url(./Assests/WeatherBgs/thunder.jpg) fixed no-repeat center center"
            document.body.style.backgroundSize = "cover"
            document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
            //nav
            document.querySelector("#nav").style.backgroundColor = "#0000001c"
            //Search
            document.querySelector("#searchBarBody").style.backgroundColor = "#0b295838"
            document.querySelector("#searchBar").style.backgroundColor = "Transparent"

            //Top
            document.querySelector(".date_week").style.backgroundColor = "#00000033"
            document.getElementById("weather_status").style.backgroundColor = "#00000033"
            document.getElementById("min-max-temp").style.backgroundColor = "#00000033"
            //Bottom
            document.querySelector(".details").style.backgroundColor = "#062c5d00"
            document.querySelector(".weatherfeild").style.backgroundColor = "#062c5d00"
            document.querySelector(".otherdetailsfeeild").style.backgroundColor = "#062c5d00"

            //MORE DETAILS
            document.querySelector(".moreDetailsHead").style.backgroundColor = "#00000033"
            document.querySelector(".moreDetailsbody").style.backgroundColor = "#062c5d00"
        }






        //Day Part
        //Day Part.......................................................................................
        // 1) Clouds
        if (city_weather_status === "overcast clouds" && currentTimeStatus === "Day") {
            console.log("perfect")
            weather_icon.src = "./Assests/weather/64x64/day/122.png"
            document.body.style.background = "url(./Assests/WeatherBgs/pexels-engin-akyurt-6137895.jpg) fixed no-repeat center center"
            document.body.style.backgroundSize = "cover"
            document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
            //nav
            document.querySelector("#nav").style.backgroundColor = "#00000031"
            //Search
            document.querySelector("#searchBarBody").style.backgroundColor = "#0000007d"
            document.querySelector("#searchBar").style.backgroundColor = "Transparent"

            //Top
            document.querySelector(".date_week").style.backgroundColor = "#0000004f"
            document.getElementById("weather_status").style.backgroundColor = "#0000004f"
            document.getElementById("min-max-temp").style.backgroundColor = "#0000004f"
            //Bottom
            document.querySelector(".details").style.backgroundColor = "#00000052"
            document.querySelector(".weatherfeild").style.backgroundColor = "#00000052"
            document.querySelector(".otherdetailsfeeild").style.backgroundColor = "#00000052"

            //MORE DETAILS
            document.querySelector(".moreDetailsHead").style.backgroundColor = "#0000004f"
            document.querySelector(".moreDetailsbody").style.backgroundColor = "#00000052"


        } 
        else if (city_weather_status === "broken clouds" && currentTimeStatus === "Day") {
            weather_icon.src = "./Assests/weather/64x64/day/119.png"
            document.body.style.background = "url(./Assests/WeatherBgs/Broken.jpg) fixed no-repeat center center"
            document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
            //nav
            document.querySelector("#nav").style.backgroundColor = "#00000031"
            //Search
            document.querySelector("#searchBarBody").style.backgroundColor = "#0000007d"
            document.querySelector("#searchBar").style.backgroundColor = "Transparent"

            //Top
            document.querySelector(".date_week").style.backgroundColor = "#0000004f"
            document.getElementById("weather_status").style.backgroundColor = "#0000004f"
            document.getElementById("min-max-temp").style.backgroundColor = "#0000004f"
            //Bottom
            document.querySelector(".details").style.backgroundColor = "#00000052"
            document.querySelector(".weatherfeild").style.backgroundColor = "#00000052"
            document.querySelector(".otherdetailsfeeild").style.backgroundColor = "#00000052"

            //MORE DETAILS
            document.querySelector(".moreDetailsHead").style.backgroundColor = "#0000004f"
            document.querySelector(".moreDetailsbody").style.backgroundColor = "#00000052"

        } 
        else if (city_weather_status === "scattered clouds" && currentTimeStatus === "Day") {
            weather_icon.src = "./Assests/weather/64x64/day/143.png"
            document.body.style.background = "url(./Assests/WeatherBgs/scatterdCloud_nightt.jpg) fixed no-repeat center center"
            document.body.style.backgroundSize = "cover"
            document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
            //nav
            document.querySelector("#nav").style.backgroundColor = "#00000031"
            //Search
            document.querySelector("#searchBarBody").style.backgroundColor = "#00000033"
            document.querySelector("#searchBar").style.backgroundColor = "Transparent"

            //Top
            document.querySelector(".date_week").style.backgroundColor = "#00000033"
            document.getElementById("weather_status").style.backgroundColor = "#00000033"
            document.getElementById("min-max-temp").style.backgroundColor = "#00000033"
            //Bottom
            document.querySelector(".details").style.backgroundColor = "#062c5d00"
            document.querySelector(".weatherfeild").style.backgroundColor = "#062c5d00"
            document.querySelector(".otherdetailsfeeild").style.backgroundColor = "#062c5d00"

            //MORE DETAILS
            document.querySelector(".moreDetailsHead").style.backgroundColor = "#00000033"
            document.querySelector(".moreDetailsbody").style.backgroundColor = "#062c5d00"

        } 
        else if (city_weather_status === "few clouds" && currentTimeStatus === "Day") {
            weather_icon.src = "./Assests/weather/64x64/day/116.png"
            document.body.style.background = "url(./Assests/WeatherBgs/pexels-pixabay-531756.jpg) fixed no-repeat center center"
            document.body.style.backgroundSize = "cover"
            document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
            //nav
            document.querySelector("#nav").style.backgroundColor = "#00000031"
            //Search
            document.querySelector("#searchBarBody").style.backgroundColor = "#0000007d"
            document.querySelector("#searchBar").style.backgroundColor = "Transparent"

            //Top
            document.querySelector(".date_week").style.backgroundColor = "#0000004f"
            document.getElementById("weather_status").style.backgroundColor = "#0000004f"
            document.getElementById("min-max-temp").style.backgroundColor = "#0000004f"
            //Bottom
            document.querySelector(".details").style.backgroundColor = "#00000052"
            document.querySelector(".weatherfeild").style.backgroundColor = "#00000052"
            document.querySelector(".otherdetailsfeeild").style.backgroundColor = "#00000052"

            //MORE DETAILS
            document.querySelector(".moreDetailsHead").style.backgroundColor = "#0000004f"
            document.querySelector(".moreDetailsbody").style.backgroundColor = "#00000052"


        } 
        else if (city_weather_status === "clear sky" && currentTimeStatus === "Day") {
            weather_icon.src = "./Assests/weather/64x64/Day/113.png"
            document.body.style.background = "url(./Assests/WeatherBgs/clrSky.jpg) fixed no-repeat center center"
            document.body.style.backgroundSize = "cover"
            document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
            //nav
            document.querySelector("#nav").style.backgroundColor = "#00000031"
            //Search
            document.querySelector("#searchBarBody").style.backgroundColor = "#0b295838"
            document.querySelector("#searchBar").style.backgroundColor = "Transparent"

            //Top
            document.querySelector(".date_week").style.backgroundColor = "#00000033"
            document.getElementById("weather_status").style.backgroundColor = "#00000033"
            document.getElementById("min-max-temp").style.backgroundColor = "#00000033"
            //Bottom
            document.querySelector(".details").style.backgroundColor = "#00000066"
            document.querySelector(".weatherfeild").style.backgroundColor = "#00000066"
            document.querySelector(".otherdetailsfeeild").style.backgroundColor = "#00000066"

            //MORE DETAILS
            document.querySelector(".moreDetailsHead").style.backgroundColor = "#00000033"
            document.querySelector(".moreDetailsbody").style.backgroundColor = "#00000066"
        }

        //Rain.......................................................................................................................
        else if (city_weather_status === "light rain" && currentTimeStatus === "Day" || city_weather_status === "moderate rain" && currentTimeStatus === "Day" || city_weather_status === "shower rain" && currentTimeStatus === "Day" || city_weather_status === "light intensity shower rain" && currentTimeStatus === "Day") {
            weather_icon.src = "./Assests/weather/64x64/day/305.png"
            document.body.style.background = "url(./Assests/WeatherBgs/dayRain.jpg) fixed no-repeat center center"
            document.body.style.backgroundSize = "cover"
            document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
        } 
        else if (city_weather_status === "heavy intensity rain" && currentTimeStatus === "Day" || city_weather_status === "very heavy rain" && currentTimeStatus === "Day" || city_weather_status === "extreme rain" && currentTimeStatus === "Day" || city_weather_status === "heavy intensity shower rain" && currentTimeStatus === "Day") {
            weather_icon.src = "./Assests/weather/64x64/day/308.png"
            document.body.style.background = "url(./Assests/WeatherBgs/dayRain.jpg) fixed no-repeat center center"
            document.body.style.backgroundSize = "cover"
            document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
        } 
        else if (city_weather_status === "ragged shower rain" && currentTimeStatus === "Day" || city_weather_status === "freezing rain" && currentTimeStatus === "Day") {
            weather_icon.src = "./Assests/weather/64x64/day/359.png"
            document.body.style.background = "url(./Assests/WeatherBgs/dayRain.jpg) fixed no-repeat center center"
            document.body.style.backgroundSize = "cover"
            document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"

        }

        //Thunder Strome.......................................................................................................................
        else if (city_weather_status === "thunderstorm with light rain" && currentTimeStatus === "Day" || city_weather_status === "thunderstorm with rain" && currentTimeStatus === "Day" || city_weather_status === "thunderstorm with heavy rain" && currentTimeStatus === "Day" || city_weather_status === "light thunderstorm" && currentTimeStatus === "Day" || city_weather_status === "	thunderstorm" && currentTimeStatus === "Day" || city_weather_status === "heavy thunderstorm" && currentTimeStatus === "Day" || city_weather_status === "ragged thunderstorm" && currentTimeStatus === "Day" || city_weather_status === "	thunderstorm with drizzle" && currentTimeStatus === "Day" || city_weather_status === "thunderstorm with heavy drizzle" && currentTimeStatus === "Day") {
            weather_icon.src = "./Assests/weather/64x64/night/389.png"
            document.body.style.background = "url(./Assests/WeatherBgs/dayThunder.jpg) fixed no-repeat center center"
            document.body.style.backgroundSize = "cover"
            document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
            //nav
            document.querySelector("#nav").style.backgroundColor = "#0000001c"
            //Search
            document.querySelector("#searchBarBody").style.backgroundColor = "#0b295838"
            document.querySelector("#searchBar").style.backgroundColor = "Transparent"

            //Top
            document.querySelector(".date_week").style.backgroundColor = "#00000033"
            document.getElementById("weather_status").style.backgroundColor = "#00000033"
            document.getElementById("min-max-temp").style.backgroundColor = "#00000033"
            //Bottom
            document.querySelector(".details").style.backgroundColor = "#062c5d00"
            document.querySelector(".weatherfeild").style.backgroundColor = "#062c5d00"
            document.querySelector(".otherdetailsfeeild").style.backgroundColor = "#062c5d00"

            //MORE DETAILS
            document.querySelector(".moreDetailsHead").style.backgroundColor = "#00000033"
            document.querySelector(".moreDetailsbody").style.backgroundColor = "#062c5d00"
        }


        // Haze.....................................................................................................................
        else if (city_weather_status === "haze" && currentTimeStatus === "Day" || city_weather_status === "mist" && currentTimeStatus === "Day" || city_weather_status === "smoke" && currentTimeStatus === "Day" || city_weather_status === "dust" && currentTimeStatus === "Day") {
            weather_icon.src = "./Assests/weather/64x64/night/248.png"
            console.log("Hmmm")
            document.body.style.background = "url(./Assests/WeatherBgs/haze.jpg) fixed no-repeat center center"
            document.body.style.backgroundSize = "cover"
            document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
            //Top
            document.querySelector(".date_week").style.backgroundColor = "#35334894"
            document.getElementById("weather_status").style.backgroundColor = "#35334894"
            document.getElementById("min-max-temp").style.backgroundColor = " #35334894"
            //Bottom
            document.querySelector(".details").style.backgroundColor = "#062c5d00"
            document.querySelector(".weatherfeild").style.backgroundColor = "#062c5d00"
            document.querySelector(".otherdetailsfeeild").style.backgroundColor = "#062c5d00"
            //MORE DETAILS
            document.querySelector(".moreDetailsHead").style.backgroundColor = "#35334894"
            document.querySelector(".moreDetailsbody").style.backgroundColor = "#062c5d00"

        }
        //Fog.......................................................................................................................
        else if (city_weather_status === "fog" && currentTimeStatus === "Day") {
            weather_icon.src = "./Assests/weather/64x64/night/fog.png"
            document.body.style.background = "url(./Assests/WeatherBgs/fog.jpg) fixed no-repeat center center"
            document.body.style.backgroundSize = "cover"
            document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
            document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
            //nav
            document.querySelector("#nav").style.backgroundColor = "#00000031"
            //Search
            document.querySelector("#searchBarBody").style.backgroundColor = "#0000007d"
            document.querySelector("#searchBar").style.backgroundColor = "Transparent"

            //Top
            document.querySelector(".date_week").style.backgroundColor = "#0000004f"
            document.getElementById("weather_status").style.backgroundColor = "#0000004f"
            document.getElementById("min-max-temp").style.backgroundColor = "#0000004f"
            //Bottom
            document.querySelector(".details").style.backgroundColor = "#00000052"
            document.querySelector(".weatherfeild").style.backgroundColor = "#00000052"
            document.querySelector(".otherdetailsfeeild").style.backgroundColor = "#00000052"

            //MORE DETAILS
            document.querySelector(".moreDetailsHead").style.backgroundColor = "#0000004f"
            document.querySelector(".moreDetailsbody").style.backgroundColor = "#00000052"

        }

        document.getElementById("loadingbar").style.width = "100%"
        document.getElementById("loadingbar").style.display = "none"


        // More Details.....
        //    day 1
        day1Temp.innerText = geoLocationOfDevce[0].daily[1].temp.max
        day1TempL.innerText = geoLocationOfDevce[0].daily[1].temp.min
        //    day 2
        day2Temp.innerHTML = geoLocationOfDevce[0].daily[2].temp.max
        day2TempL.innerHTML = geoLocationOfDevce[0].daily[2].temp.min
        //    day 3
        day3Temp.innerText = geoLocationOfDevce[0].daily[3].temp.max
        day3TempL.innerText = geoLocationOfDevce[0].daily[3].temp.min
        //    day 4
        day4Temp.innerText = geoLocationOfDevce[0].daily[4].temp.max
        day4TempL.innerText = geoLocationOfDevce[0].daily[4].temp.min
        //    day 5
        day5Temp.innerText = geoLocationOfDevce[0].daily[5].temp.max
        day5TempL.innerText = geoLocationOfDevce[0].daily[5].temp.min
        //    day 6
        day6Temp.innerText = geoLocationOfDevce[0].daily[6].temp.max
        day6TempL.innerText = geoLocationOfDevce[0].daily[6].temp.min
        //    day 7
        day7Temp.innerText = geoLocationOfDevce[0].daily[7].temp.max
        day7TempL.innerText = geoLocationOfDevce[0].daily[7].temp.min



    } catch (e) {
        //Validation
        console.log("Error :", e)
        document.getElementById('errorContent').innerText = "Somthing went wront"
        document.getElementById("cityNameError").style.display = "flex"
    }
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById('errorContent').innerText = "You denied the request for Geolocation."
            document.getElementById("cityNameError").style.display = "flex"
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById('errorContent').innerText = "Location information is unavailable."
            document.getElementById("cityNameError").style.display = "flex"
            break;
        case error.TIMEOUT:
            document.getElementById('errorContent').innerText = "The request to get user location timed out."
            document.getElementById("cityNameError").style.display = "flex"
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById('errorContent').innerText = "An unknown error occurred."
            document.getElementById("cityNameError").style.display = "flex"
            break;
    }
}


/*****************************************************************************************************************************
 * ***************************************************************************************************************************
 ******************************************************************************************************************************/

//Search bar function...
searchBTN.addEventListener("click", async function getWeather() {
    let searchBarValue = searchBar.value
    if (searchBarValue === "") {
        document.getElementById("cityNameError").style.display = "flex"
    } else {

        try {
            document.getElementById("loadingbar").style.display = "block"
            document.getElementById("cityNameError").style.display = "none"
            //Get weather data...
            let url = `http://api.openweathermap.org/geo/1.0/direct?q=${searchBarValue}&limit=1&appid=86d6b0edaf026c4efc0e9aa5f74d9f75`
            let response = await fetch(url)
            let responseJson = await response.json()
            let dataArr = [responseJson]
            console.log(dataArr)
            let getGeoCorLat = dataArr[0][0].lat
            let getGeoCorLon = dataArr[0][0].lon
            console.log(getGeoCorLat)
            let searchBarGeoApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${getGeoCorLat}&lon=${getGeoCorLon}&exclude=hourly,minutely&units=metric&appid=86d6b0edaf026c4efc0e9aa5f74d9f75`
            let srchBarApiFetcher = await fetch(searchBarGeoApiUrl)
            let srchBarApiJson = await srchBarApiFetcher.json();
            let srchBarApi = [srchBarApiJson]
            //City Name
            cityName = dataArr[0][0].name
            document.getElementById('cityName').innerText = `${cityName},${dataArr[0][0].country}`

            //Latitude
            let latitudeCoord = srchBarApi[0].lat
            latitude.innerText = latitudeCoord
            latitude.style.color = "white"
            //Longitude
            let longitudeCoord = srchBarApi[0].lon
            longitude.innerText = longitudeCoord
            longitude.style.color = "white"
            //Status
            weatherStatus.innerText = srchBarApi[0].current.weather[0].description
            //Temperature
            let cityTempInFloat = srchBarApi[0].current.temp
            let cityTemp = Math.round(cityTempInFloat)
            temp.innerText = cityTemp
            //Status Icon

            //part 1 : get time status... After Exam I have to Update this...
            let cit_lat = dataArr[0][0].lat
            let city_long = dataArr[0][0].lon
            let ExtendedURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${cit_lat}&lon=${city_long}&exclude=hourly,daily&appid=86d6b0edaf026c4efc0e9aa5f74d9f75`
            let responseExtenden = await fetch(ExtendedURL)
            let responseJsonExt = await responseExtenden.json()
            let dataArrExt = [responseJsonExt]
            let cityTimeDt = dataArrExt[0].current.dt
            let citySunrise = dataArrExt[0].current.sunrise
            let citySunset = dataArrExt[0].current.sunset
            let currentTimeStatus = ""
            if (cityTimeDt > citySunrise && cityTimeDt < citySunset) {
                //console.log("Day")
                currentTimeStatus = "Day"
            } else if (cityTimeDt > citySunset && cityTimeDt > citySunrise) {
                //console.log("Night")
                currentTimeStatus = "Night"
            } else if (cityTimeDt < citySunrise && cityTimeDt < citySunset) {
                //console.log("Mid Night")
                currentTimeStatus = "Night"
            }
            console.log("Status ", currentTimeStatus)
            console.log("Time iss ", dataArrExt)

            //part 2 : Weather status 
            let city_weather_status = srchBarApi[0].current.weather[0].description
            console.log("Main :", city_weather_status)

            //Night part
            if (city_weather_status === "overcast clouds" && currentTimeStatus === "Night") {
                console.log("perfect")
                weather_icon.src = "./Assests/weather/64x64/night/122.png"
                document.body.style.background = "url(./Assests/WeatherBgs/overcust-cloud-1.PNG) fixed no-repeat center center"
                document.body.style.backgroundSize = "cover"
                document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
                //nav
                document.querySelector("#nav").style.backgroundColor = "#00000031"
                //Search
                document.querySelector("#searchBarBody").style.backgroundColor = "#00000033"
                document.querySelector("#searchBar").style.backgroundColor = "Transparent"

                //Top
                document.querySelector(".date_week").style.backgroundColor = "#00000033"
                document.getElementById("weather_status").style.backgroundColor = "#00000033"
                document.getElementById("min-max-temp").style.backgroundColor = "#00000033"
                //Bottom
                document.querySelector(".details").style.backgroundColor = "#062c5d00"
                document.querySelector(".weatherfeild").style.backgroundColor = "#062c5d00"
                document.querySelector(".otherdetailsfeeild").style.backgroundColor = "#062c5d00"

                //MORE DETAILS
                document.querySelector(".moreDetailsHead").style.backgroundColor = "#00000033"
                document.querySelector(".moreDetailsbody").style.backgroundColor = "#062c5d00"

                //Broken clouds mode............
            } else if (city_weather_status === "broken clouds" && currentTimeStatus === "Night") {
                weather_icon.src = "./Assests/weather/64x64/night/119.png"
                document.body.style.background = "url(./Assests/WeatherBgs/brokenCloud_night.jpg) fixed no-repeat center center"
                document.body.style.backgroundSize = "cover"
                document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
                //nav
                document.querySelector("#nav").style.backgroundColor = "#0000001c"
                //Search
                document.querySelector("#searchBarBody").style.backgroundColor = "#0b295838"
                document.querySelector("#searchBar").style.backgroundColor = "Transparent"

                //Top
                document.querySelector(".date_week").style.backgroundColor = "#00000033"
                document.getElementById("weather_status").style.backgroundColor = "#00000033"
                document.getElementById("min-max-temp").style.backgroundColor = "#00000033"
                //Bottom
                document.querySelector(".details").style.backgroundColor = "#062c5d00"
                document.querySelector(".weatherfeild").style.backgroundColor = "#062c5d00"
                document.querySelector(".otherdetailsfeeild").style.backgroundColor = "#062c5d00"

                //MORE DETAILS
                document.querySelector(".moreDetailsHead").style.backgroundColor = "#00000033"
                document.querySelector(".moreDetailsbody").style.backgroundColor = "#062c5d00"


                //Scattered clouds mode.........
            } else if (city_weather_status === "scattered clouds" && currentTimeStatus === "Night") {
                weather_icon.src = "./Assests/weather/64x64/night/143.png"
                document.body.style.background = "url(./Assests/WeatherBgs/scatterdCloud_nightt.jpg) fixed no-repeat center center"
                document.body.style.backgroundSize = "cover"
                document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
                //nav
                document.querySelector("#nav").style.backgroundColor = "#00000031"
                //Search
                document.querySelector("#searchBarBody").style.backgroundColor = "#00000033"
                document.querySelector("#searchBar").style.backgroundColor = "Transparent"

                //Top
                document.querySelector(".date_week").style.backgroundColor = "#00000033"
                document.getElementById("weather_status").style.backgroundColor = "#00000033"
                document.getElementById("min-max-temp").style.backgroundColor = "#00000033"
                //Bottom
                document.querySelector(".details").style.backgroundColor = "#062c5d00"
                document.querySelector(".weatherfeild").style.backgroundColor = "#062c5d00"
                document.querySelector(".otherdetailsfeeild").style.backgroundColor = "#062c5d00"

                //MORE DETAILS
                document.querySelector(".moreDetailsHead").style.backgroundColor = "#00000033"
                document.querySelector(".moreDetailsbody").style.backgroundColor = "#062c5d00"


                //Few Clouds Mode..................
            } else if (city_weather_status === "few clouds" && currentTimeStatus === "Night") {
                weather_icon.src = "./Assests/weather/64x64/night/116.png"
                document.body.style.background = "url(./Assests/WeatherBgs/Few_clouds.jpg) fixed no-repeat center center"
                document.body.style.backgroundSize = "cover"
                document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
                //nav
                document.querySelector("#nav").style.backgroundColor = "#0000001c"
                //Search
                document.querySelector("#searchBarBody").style.backgroundColor = "#0b295838"
                document.querySelector("#searchBar").style.backgroundColor = "Transparent"

                //Top
                document.querySelector(".date_week").style.backgroundColor = "#00000033"
                document.getElementById("weather_status").style.backgroundColor = "#00000033"
                document.getElementById("min-max-temp").style.backgroundColor = "#00000033"
                //Bottom
                document.querySelector(".details").style.backgroundColor = "#062c5d00"
                document.querySelector(".weatherfeild").style.backgroundColor = "#062c5d00"
                document.querySelector(".otherdetailsfeeild").style.backgroundColor = "#062c5d00"

                //MORE DETAILS
                document.querySelector(".moreDetailsHead").style.backgroundColor = "#00000033"
                document.querySelector(".moreDetailsbody").style.backgroundColor = "#062c5d00"

            }

            //Clear sky Mode............
            else if (city_weather_status === "clear sky" && currentTimeStatus === "Night") {
                weather_icon.src = "./Assests/weather/64x64/night/113.png"
                document.body.style.background = "url(./Assests/WeatherBgs/clearSky.jpg) fixed no-repeat center center"
                document.body.style.backgroundSize = "cover"
                document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
                //nav
                document.querySelector("#nav").style.backgroundColor = "#00000031"
                //Search
                document.querySelector("#searchBarBody").style.backgroundColor = "#0b295838"
                document.querySelector("#searchBar").style.backgroundColor = "Transparent"

                //Top
                document.querySelector(".date_week").style.backgroundColor = "#00000033"
                document.getElementById("weather_status").style.backgroundColor = "#00000033"
                document.getElementById("min-max-temp").style.backgroundColor = "#00000033"
                //Bottom
                document.querySelector(".details").style.backgroundColor = "#062c5d00"
                document.querySelector(".weatherfeild").style.backgroundColor = "#062c5d00"
                document.querySelector(".otherdetailsfeeild").style.backgroundColor = "#062c5d00"

                //MORE DETAILS
                document.querySelector(".moreDetailsHead").style.backgroundColor = "#00000033"
                document.querySelector(".moreDetailsbody").style.backgroundColor = "#062c5d00"
            }

            // Haze.....................................................................................................................
            else if (city_weather_status === "haze" && currentTimeStatus === "Night" || city_weather_status === "mist" && currentTimeStatus === "Night" || city_weather_status === "smoke" && currentTimeStatus === "Night" || city_weather_status === "sand" && currentTimeStatus === "Night" || city_weather_status === "dust" && currentTimeStatus === "Night") {
                weather_icon.src = "./Assests/weather/64x64/night/248.png"
                console.log("Hmmm")
                document.body.style.background = "url(./Assests/WeatherBgs/haze.jpg) fixed no-repeat center center"
                document.body.style.backgroundSize = "cover"
                document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
                //Top
                document.querySelector(".date_week").style.backgroundColor = "#35334894"
                document.getElementById("weather_status").style.backgroundColor = "#35334894"
                document.getElementById("min-max-temp").style.backgroundColor = " #35334894"
                //Bottom
                document.querySelector(".details").style.backgroundColor = "#062c5d00"
                document.querySelector(".weatherfeild").style.backgroundColor = "#062c5d00"
                document.querySelector(".otherdetailsfeeild").style.backgroundColor = "#062c5d00"
                //MORE DETAILS
                document.querySelector(".moreDetailsHead").style.backgroundColor = "#35334894"
                document.querySelector(".moreDetailsbody").style.backgroundColor = "#062c5d00"

            }

            //Fog.......................................................................................................................
            else if (city_weather_status === "fog" && currentTimeStatus === "Night") {
                weather_icon.src = "./Assests/weather/64x64/night/fog.png"
                document.body.style.background = "url(./Assests/WeatherBgs/nfog.PNG) fixed no-repeat center center"
                document.body.style.backgroundSize = "cover"
                document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
                //nav
                document.querySelector("#nav").style.backgroundColor = "#00000031"
                //Search
                document.querySelector("#searchBarBody").style.backgroundColor = "#0000007d"
                document.querySelector("#searchBar").style.backgroundColor = "Transparent"

                //Top
                document.querySelector(".date_week").style.backgroundColor = "#0000004f"
                document.getElementById("weather_status").style.backgroundColor = "#0000004f"
                document.getElementById("min-max-temp").style.backgroundColor = "#0000004f"
                //Bottom
                document.querySelector(".details").style.backgroundColor = "#00000052"
                document.querySelector(".weatherfeild").style.backgroundColor = "#00000052"
                document.querySelector(".otherdetailsfeeild").style.backgroundColor = "#00000052"

                //MORE DETAILS
                document.querySelector(".moreDetailsHead").style.backgroundColor = "#0000004f"
                document.querySelector(".moreDetailsbody").style.backgroundColor = "#00000052"

            }

            //SNOW.......................................................................................................................
            else if (city_weather_status === "light snow" && currentTimeStatus === "Night" || city_weather_status === "Snow" && currentTimeStatus === "Night") {
                weather_icon.src = "./Assests/weather/64x64/night/179.png"
                document.body.style.background = "url(./Assests/WeatherBgs/nightSnow.jpg) fixed no-repeat center center"
                document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.body.style.backgroundSize = "cover"
            } else if (city_weather_status === "Heavy snow" && currentTimeStatus === "Night") {
                weather_icon.src = "./Assests/weather/64x64/night/338.png"
                document.body.style.background = "url(./Assests/WeatherBgs/nightSnow.jpg) fixed no-repeat center center"
                document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.body.style.backgroundSize = "cover"
            } else if (city_weather_status === "Shower sleet" && currentTimeStatus === "Night" || city_weather_status === "Rain and snow" && currentTimeStatus === "Night" || city_weather_status === "Shower snow" && currentTimeStatus === "Night") {
                weather_icon.src = "./Assests/weather/64x64/night/365.png"
                document.body.style.background = "url(./Assests/WeatherBgs/nightSnow.jpg) fixed no-repeat center center"
                document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.body.style.backgroundSize = "cover"
            }

            //Rain.......................................................................................................................
            else if (city_weather_status === "light rain" && currentTimeStatus === "Night" || city_weather_status === "moderate rain" && currentTimeStatus === "Night" || city_weather_status === "shower rain" && currentTimeStatus === "Night" || city_weather_status === "light intensity shower rain" && currentTimeStatus === "Night") {
                weather_icon.src = "./Assests/weather/64x64/night/305.png"
                document.body.style.background = "url(./Assests/WeatherBgs/rainNight.jpg) fixed no-repeat center center"
                document.body.style.backgroundSize = "cover"
                document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
            } else if (city_weather_status === "heavy intensity rain" && currentTimeStatus === "Night" || city_weather_status === "very heavy rain" && currentTimeStatus === "Night" || city_weather_status === "extreme rain" && currentTimeStatus === "Night" || city_weather_status === "heavy intensity shower rain" && currentTimeStatus === "Night") {
                weather_icon.src = "./Assests/weather/64x64/night/308.png"
                document.body.style.background = "url(./Assests/WeatherBgs/rainNight.jpg) fixed no-repeat center center"
                document.body.style.backgroundSize = "cover"
                document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
            } else if (city_weather_status === "ragged shower rain" && currentTimeStatus === "Night" || city_weather_status === "freezing rain" && currentTimeStatus === "Night") {
                weather_icon.src = "./Assests/weather/64x64/night/359.png"
                document.body.style.background = "url(./Assests/WeatherBgs/rainNight.jpg) fixed no-repeat center center"
                document.body.style.backgroundSize = "cover"
                document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"

            }

            //Thunder Strome.......................................................................................................................
            else if (city_weather_status === "thunderstorm with light rain" && currentTimeStatus === "Night" || city_weather_status === "thunderstorm with rain" && currentTimeStatus === "Night" || city_weather_status === "thunderstorm with heavy rain" && currentTimeStatus === "Night" || city_weather_status === "light thunderstorm" && currentTimeStatus === "Night" || city_weather_status === "	thunderstorm" && currentTimeStatus === "Night" || city_weather_status === "heavy thunderstorm" && currentTimeStatus === "Night" || city_weather_status === "ragged thunderstorm" && currentTimeStatus === "Night" || city_weather_status === "	thunderstorm with drizzle" && currentTimeStatus === "Night" || city_weather_status === "thunderstorm with heavy drizzle" && currentTimeStatus === "Night") {
                weather_icon.src = "./Assests/weather/64x64/night/389.png"
                document.body.style.background = "url(./Assests/WeatherBgs/thunder.jpg) fixed no-repeat center center"
                document.body.style.backgroundSize = "cover"
                document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
                //nav
                document.querySelector("#nav").style.backgroundColor = "#0000001c"
                //Search
                document.querySelector("#searchBarBody").style.backgroundColor = "#0b295838"
                document.querySelector("#searchBar").style.backgroundColor = "Transparent"

                //Top
                document.querySelector(".date_week").style.backgroundColor = "#00000033"
                document.getElementById("weather_status").style.backgroundColor = "#00000033"
                document.getElementById("min-max-temp").style.backgroundColor = "#00000033"
                //Bottom
                document.querySelector(".details").style.backgroundColor = "#062c5d00"
                document.querySelector(".weatherfeild").style.backgroundColor = "#062c5d00"
                document.querySelector(".otherdetailsfeeild").style.backgroundColor = "#062c5d00"

                //MORE DETAILS
                document.querySelector(".moreDetailsHead").style.backgroundColor = "#00000033"
                document.querySelector(".moreDetailsbody").style.backgroundColor = "#062c5d00"
            }


            //Day Part.......................................................................................
            // 1) Clouds
            if (city_weather_status === "overcast clouds" && currentTimeStatus === "Day") {
                console.log("perfect")
                weather_icon.src = "./Assests/weather/64x64/day/122.png"
                document.body.style.background = "url(./Assests/WeatherBgs/pexels-engin-akyurt-6137895.jpg) fixed no-repeat center center"
                document.body.style.backgroundSize = "cover"
                document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
                //nav
                document.querySelector("#nav").style.backgroundColor = "#00000031"
                //Search
                document.querySelector("#searchBarBody").style.backgroundColor = "#0000007d"
                document.querySelector("#searchBar").style.backgroundColor = "Transparent"

                //Top
                document.querySelector(".date_week").style.backgroundColor = "#0000004f"
                document.getElementById("weather_status").style.backgroundColor = "#0000004f"
                document.getElementById("min-max-temp").style.backgroundColor = "#0000004f"
                //Bottom
                document.querySelector(".details").style.backgroundColor = "#00000052"
                document.querySelector(".weatherfeild").style.backgroundColor = "#00000052"
                document.querySelector(".otherdetailsfeeild").style.backgroundColor = "#00000052"

                //MORE DETAILS
                document.querySelector(".moreDetailsHead").style.backgroundColor = "#0000004f"
                document.querySelector(".moreDetailsbody").style.backgroundColor = "#00000052"


            } else if (city_weather_status === "broken clouds" && currentTimeStatus === "Day") {
                weather_icon.src = "./Assests/weather/64x64/day/119.png"
                document.body.style.background = "url(./Assests/WeatherBgs/Broken.jpg) fixed no-repeat center center"
                document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
                //nav
                document.querySelector("#nav").style.backgroundColor = "#00000031"
                //Search
                document.querySelector("#searchBarBody").style.backgroundColor = "#00000082"
                document.querySelector("#searchBar").style.backgroundColor = "Transparent"

                //Top
                document.querySelector(".date_week").style.backgroundColor = "#0000004f"
                document.getElementById("weather_status").style.backgroundColor = "#0000004f"
                document.getElementById("min-max-temp").style.backgroundColor = "#0000004f"
                //Bottom
                document.querySelector(".details").style.backgroundColor = "#00000082"
                document.querySelector(".weatherfeild").style.backgroundColor = "#00000082"
                document.querySelector(".otherdetailsfeeild").style.backgroundColor = "#00000082"

                //MORE DETAILS
                document.querySelector(".moreDetailsHead").style.backgroundColor = "#0000004f"
                document.querySelector(".moreDetailsbody").style.backgroundColor = "#00000082"

            } else if (city_weather_status === "scattered clouds" && currentTimeStatus === "Day") {
                weather_icon.src = "./Assests/weather/64x64/day/143.png"
                document.body.style.background = "url(./Assests/WeatherBgs/scatterdCloud_nightt.jpg) fixed no-repeat center center"
                document.body.style.backgroundSize = "cover"
                document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
                //nav
                document.querySelector("#nav").style.backgroundColor = "#00000031"
                //Search
                document.querySelector("#searchBarBody").style.backgroundColor = "#00000033"
                document.querySelector("#searchBar").style.backgroundColor = "Transparent"

                //Top
                document.querySelector(".date_week").style.backgroundColor = "#00000033"
                document.getElementById("weather_status").style.backgroundColor = "#00000033"
                document.getElementById("min-max-temp").style.backgroundColor = "#00000033"
                //Bottom
                document.querySelector(".details").style.backgroundColor = "#062c5d00"
                document.querySelector(".weatherfeild").style.backgroundColor = "#062c5d00"
                document.querySelector(".otherdetailsfeeild").style.backgroundColor = "#062c5d00"

                //MORE DETAILS
                document.querySelector(".moreDetailsHead").style.backgroundColor = "#00000033"
                document.querySelector(".moreDetailsbody").style.backgroundColor = "#062c5d00"

            } else if (city_weather_status === "few clouds" && currentTimeStatus === "Day") {
                weather_icon.src = "./Assests/weather/64x64/day/116.png"
                document.body.style.background = "url(./Assests/WeatherBgs/pexels-pixabay-531756.jpg) fixed no-repeat center center"
                document.body.style.backgroundSize = "cover"
                document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
                //nav
                document.querySelector("#nav").style.backgroundColor = "#00000031"
                //Search
                document.querySelector("#searchBarBody").style.backgroundColor = "#0000007d"
                document.querySelector("#searchBar").style.backgroundColor = "Transparent"

                //Top
                document.querySelector(".date_week").style.backgroundColor = "#0000004f"
                document.getElementById("weather_status").style.backgroundColor = "#0000004f"
                document.getElementById("min-max-temp").style.backgroundColor = "#0000004f"
                //Bottom
                document.querySelector(".details").style.backgroundColor = "#00000052"
                document.querySelector(".weatherfeild").style.backgroundColor = "#00000052"
                document.querySelector(".otherdetailsfeeild").style.backgroundColor = "#00000052"

                //MORE DETAILS
                document.querySelector(".moreDetailsHead").style.backgroundColor = "#0000004f"
                document.querySelector(".moreDetailsbody").style.backgroundColor = "#00000052"


            } else if (city_weather_status === "clear sky" && currentTimeStatus === "Day") {
                weather_icon.src = "./Assests/weather/64x64/Day/113.png"
                document.body.style.background = "url(./Assests/WeatherBgs/clrSky.jpg) fixed no-repeat center center"
                document.body.style.backgroundSize = "cover"
                document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
                //nav
                document.querySelector("#nav").style.backgroundColor = "#00000031"
                //Search
                document.querySelector("#searchBarBody").style.backgroundColor = "#0b295838"
                document.querySelector("#searchBar").style.backgroundColor = "Transparent"

                //Top
                document.querySelector(".date_week").style.backgroundColor = "#00000033"
                document.getElementById("weather_status").style.backgroundColor = "#00000033"
                document.getElementById("min-max-temp").style.backgroundColor = "#00000033"
                //Bottom
                document.querySelector(".details").style.backgroundColor = "#00000066"
                document.querySelector(".weatherfeild").style.backgroundColor = "#00000066"
                document.querySelector(".otherdetailsfeeild").style.backgroundColor = "#00000066"

                //MORE DETAILS
                document.querySelector(".moreDetailsHead").style.backgroundColor = "#00000033"
                document.querySelector(".moreDetailsbody").style.backgroundColor = "#00000066"
            }

            //Rain.......................................................................................................................
            else if (city_weather_status === "light rain" && currentTimeStatus === "Day" || city_weather_status === "moderate rain" && currentTimeStatus === "Day" || city_weather_status === "shower rain" && currentTimeStatus === "Day" || city_weather_status === "light intensity shower rain" && currentTimeStatus === "Day") {
                weather_icon.src = "./Assests/weather/64x64/day/305.png"
                document.body.style.background = "url(./Assests/WeatherBgs/dayRain.jpg) fixed no-repeat center center"
                document.body.style.backgroundSize = "cover"
                document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
            } else if (city_weather_status === "heavy intensity rain" && currentTimeStatus === "Day" || city_weather_status === "very heavy rain" && currentTimeStatus === "Day" || city_weather_status === "extreme rain" && currentTimeStatus === "Day" || city_weather_status === "heavy intensity shower rain" && currentTimeStatus === "Day") {
                weather_icon.src = "./Assests/weather/64x64/day/308.png"
                document.body.style.background = "url(./Assests/WeatherBgs/dayRain.jpg) fixed no-repeat center center"
                document.body.style.backgroundSize = "cover"
                document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
            } else if (city_weather_status === "ragged shower rain" && currentTimeStatus === "Day" || city_weather_status === "freezing rain" && currentTimeStatus === "Day") {
                weather_icon.src = "./Assests/weather/64x64/day/359.png"
                document.body.style.background = "url(./Assests/WeatherBgs/dayRain.jpg) fixed no-repeat center center"
                document.body.style.backgroundSize = "cover"
                document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"

            }

            //Thunder Strome.......................................................................................................................
            else if (city_weather_status === "thunderstorm with light rain" && currentTimeStatus === "Day" || city_weather_status === "thunderstorm with rain" && currentTimeStatus === "Day" || city_weather_status === "thunderstorm with heavy rain" && currentTimeStatus === "Day" || city_weather_status === "light thunderstorm" && currentTimeStatus === "Day" || city_weather_status === "	thunderstorm" && currentTimeStatus === "Day" || city_weather_status === "heavy thunderstorm" && currentTimeStatus === "Day" || city_weather_status === "ragged thunderstorm" && currentTimeStatus === "Day" || city_weather_status === "	thunderstorm with drizzle" && currentTimeStatus === "Day" || city_weather_status === "thunderstorm with heavy drizzle" && currentTimeStatus === "Day") {
                weather_icon.src = "./Assests/weather/64x64/night/389.png"
                document.body.style.background = "url(./Assests/WeatherBgs/dayThunder.jpg) fixed no-repeat center center"
                document.body.style.backgroundSize = "cover"
                document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
                //nav
                document.querySelector("#nav").style.backgroundColor = "#0000001c"
                //Search
                document.querySelector("#searchBarBody").style.backgroundColor = "#0b295838"
                document.querySelector("#searchBar").style.backgroundColor = "Transparent"

                //Top
                document.querySelector(".date_week").style.backgroundColor = "#00000033"
                document.getElementById("weather_status").style.backgroundColor = "#00000033"
                document.getElementById("min-max-temp").style.backgroundColor = "#00000033"
                //Bottom
                document.querySelector(".details").style.backgroundColor = "#062c5d00"
                document.querySelector(".weatherfeild").style.backgroundColor = "#062c5d00"
                document.querySelector(".otherdetailsfeeild").style.backgroundColor = "#062c5d00"

                //MORE DETAILS
                document.querySelector(".moreDetailsHead").style.backgroundColor = "#00000033"
                document.querySelector(".moreDetailsbody").style.backgroundColor = "#062c5d00"
            }


            // Haze.....................................................................................................................
            else if (city_weather_status === "haze" && currentTimeStatus === "Day" || city_weather_status === "mist" && currentTimeStatus === "Day" || city_weather_status === "smoke" && currentTimeStatus === "Day" || city_weather_status === "dust" && currentTimeStatus === "Day") {
                weather_icon.src = "./Assests/weather/64x64/night/248.png"
                console.log("Hmmm")
                document.body.style.background = "url(./Assests/WeatherBgs/haze.jpg) fixed no-repeat center center"
                document.body.style.backgroundSize = "cover"
                document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
                //Top
                document.querySelector(".date_week").style.backgroundColor = "#35334894"
                document.getElementById("weather_status").style.backgroundColor = "#35334894"
                document.getElementById("min-max-temp").style.backgroundColor = " #35334894"
                //Bottom
                document.querySelector(".details").style.backgroundColor = "#062c5d00"
                document.querySelector(".weatherfeild").style.backgroundColor = "#062c5d00"
                document.querySelector(".otherdetailsfeeild").style.backgroundColor = "#062c5d00"
                //MORE DETAILS
                document.querySelector(".moreDetailsHead").style.backgroundColor = "#35334894"
                document.querySelector(".moreDetailsbody").style.backgroundColor = "#062c5d00"

            }
            //Fog.......................................................................................................................
            else if (city_weather_status === "fog" && currentTimeStatus === "Day") {
                weather_icon.src = "./Assests/weather/64x64/night/fog.png"
                document.body.style.background = "url(./Assests/WeatherBgs/fog.jpg) fixed no-repeat center center"
                document.body.style.backgroundSize = "cover"
                document.querySelector(".details").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".weatherfeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".otherdetailsfeeild").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector("#searchBarBody").style.boxShadow = "0px 10px 10px 5px #00000054"
                document.querySelector(".MoreDetailscontainrer").style.boxShadow = "0px 10px 10px 5px #00000054"
                //nav
                document.querySelector("#nav").style.backgroundColor = "#00000031"
                //Search
                document.querySelector("#searchBarBody").style.backgroundColor = "#0000007d"
                document.querySelector("#searchBar").style.backgroundColor = "Transparent"

                //Top
                document.querySelector(".date_week").style.backgroundColor = "#0000004f"
                document.getElementById("weather_status").style.backgroundColor = "#0000004f"
                document.getElementById("min-max-temp").style.backgroundColor = "#0000004f"
                //Bottom
                document.querySelector(".details").style.backgroundColor = "#00000052"
                document.querySelector(".weatherfeild").style.backgroundColor = "#00000052"
                document.querySelector(".otherdetailsfeeild").style.backgroundColor = "#00000052"

                //MORE DETAILS
                document.querySelector(".moreDetailsHead").style.backgroundColor = "#0000004f"
                document.querySelector(".moreDetailsbody").style.backgroundColor = "#00000052"

            }



            document.getElementById("loadingbar").style.width = "100%"
            document.getElementById("loadingbar").style.display = "none"

            //Max And Min temp
            let maxTempFloat = srchBarApi[0].daily[0].temp.max
            let minTempFloat = srchBarApi[0].daily[0].temp.min
            //console.log(dataArr)
            let maxTemp = Math.round(maxTempFloat)
            let minTemp = Math.round(minTempFloat)
            maxTemperature.innerText = maxTemp
            minTemperature.innerText = minTemp

            //Feels like
            let feelsLikeFloat = srchBarApi[0].current.feels_like
            tempFeelsLike.innerText = `${Math.round(feelsLikeFloat)} °c`

            //Humidity
            let humidityFloat = srchBarApi[0].current.humidity
            Humidity.innerText = `${Math.round(humidityFloat)} %`

            //Pressure
            let pressureData = srchBarApi[0].current.pressure
            pressure.innerText = `${pressureData} mb`

            //Wind
            let windSpeed = srchBarApi[0].current.wind_speed
            let windDeg = srchBarApi[0].current.wind_deg
            wind.innerText = `${windSpeed} km/h (${windDeg}°)`

            // More Details.....
            //    day 1
            day1Temp.innerText = srchBarApi[0].daily[1].temp.max
            day1TempL.innerText = srchBarApi[0].daily[1].temp.min
            //    day 2
            day2Temp.innerHTML = srchBarApi[0].daily[2].temp.max
            day2TempL.innerHTML = srchBarApi[0].daily[2].temp.min
            //    day 3
            day3Temp.innerText = srchBarApi[0].daily[3].temp.max
            day3TempL.innerText = srchBarApi[0].daily[3].temp.min
            //    day 4
            day4Temp.innerText = srchBarApi[0].daily[4].temp.max
            day4TempL.innerText = srchBarApi[0].daily[4].temp.min
            //    day 5
            day5Temp.innerText = srchBarApi[0].daily[5].temp.max
            day5TempL.innerText = srchBarApi[0].daily[5].temp.min
            //    day 6
            day6Temp.innerText = srchBarApi[0].daily[6].temp.max
            day6TempL.innerText = srchBarApi[0].daily[6].temp.min
            //    day 7
            day7Temp.innerText = srchBarApi[0].daily[7].temp.max
            day7TempL.innerText = srchBarApi[0].daily[7].temp.min

            let cityState = dataArr[0][0].state
            document.getElementById("stateName").innerText = cityState



        } catch (e) {
            //Validation
            console.log("Error :", e)
            document.getElementById('errorContent').innerText = "Please Enter a valid City Name or Postalcode"
            document.getElementById("cityNameError").style.display = "flex"

        }



    }


})

//More Details function....
let h = document.getElementById("")

document.getElementById("dropDown-UpBtn").addEventListener('click', function moreDetails() {

    if (document.getElementById("dropDown-UpBtn").className == "fas fa-chevron-circle-up") {
        document.getElementById("dropDown-UpBtn").className = "fas fa-chevron-circle-down"
        document.getElementById("collaps_details").style.height = "0"
    } else {
        document.getElementById("dropDown-UpBtn").className = "fas fa-chevron-circle-up"
        document.getElementById("collaps_details").style.height = "100%"
    }
})





//Date and weak...
let gettingMonth = date.getMonth() + 1;
let getDate = date.getDate()
let getWeek = date.getDay()
console.log(getWeek)
let month = ""
let day = ""
//month
switch (gettingMonth) {
    case 1:
        month = "Jan"
        break
    case 2:
        month = "Feb"
        break
    case 3:
        month = "Mar"
        break
    case 4:
        month = "Apr"
        break
    case 5:
        month = "Mey"
        break
    case 6:
        month = "Jun"
        break
    case 7:
        month = "Jul";
        break
    case 8:
        month = "Aug"
        break
    case 9:
        month = "Sep"
        break
    case 10:
        month = "Oct"
        break
    case 11:
        month = "Nov"
        break
    case 12:
        month = "Dec"
        break
    default:
        month = "Sorry there is a technical problem"
}



//week

switch (getWeek) {
    case 1:
        day = "Monday"
        break
    case 2:
        day = "Tuesday"
        break
    case 3:
        day = "Wednesday"
        break
    case 4:
        day = "Thursday"
        break
    case 5:
        day = "Friday"
        break
    case 6:
        day = "Saturday"
        break
    case 0:
        day = "Sunday"
        break
    default:
        day = "sorry technical issue"
}

document.getElementById("month").innerText = month;
document.getElementById("date").innerText = getDate
document.getElementById("day").innerText = day
//onsole.log(getWeek)