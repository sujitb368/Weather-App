const time = document.getElementById("time");
const today = document.getElementById("date");
const time_zone = document.getElementById("time_zone");
const pressure = document.getElementById("pressure");
const wind = document.getElementById("wind");
const humidity = document.getElementById("time_zone");
const am_pm = document.getElementById("am_pm")
const more_wether_info = document.getElementById("more_wether_info")
const remaining_day_forcast = document.getElementById("remaining_day_forcast")
const future_forcast = document.getElementById("future_forcast")


const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//API key 
const API_KEY = "dae515892d29db64ec70a823dba68aa7";

setInterval(() => {
    const date = new Date();

    const today_date = date.getDate();
    const day = date.getDay();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const month = date.getMonth();

    // condition ? exprIfTrue : exprIfFalse
    const get_time = hour > 12 ? hour % 12 : hour;
    const get_min = minute < 10 ? "0" + minute : minute;
    const get_sec = second < 10 ? "0" + second : second
    const Am_Pm = hour >= 12 ? "pm" : "am";
    time.innerHTML = `${get_time}:${get_min}:${get_sec} <span >${Am_Pm}</span>`

    today.innerHTML = `${week[day]}, ${today_date} ${months[month]}`

        ;
}, 1000);

const show_wether_data = (data) => {
    let { humidity, pressure, wind_speed, sunrise, sunset } = data.current;

    more_wether_info.innerHTML = `
        <div class="wether_item">
            <div>Pressure</div>
            <div>${pressure}</div>
        </div>

        <div class="wether_item">
            <div>Wind</div>
            <div>${wind_speed}</div>
        </div>

        <div class="wether_item">
            <div>Humidity</div>
            <div>${humidity}</div>
        </div>
        <div class="wether_item">
            <div>Sunrise</div>
            <div>${window.moment(sunrise * 1000).format("HH:mm a")}</div>
        </div>
        <div class="wether_item">
            <div>sunset</div>
            <div>${window.moment(sunset * 1000).format("HH:mm a")}</div>
        </div>
    `;

    
    let future_Day_forcast = "";
    data.daily.forEach((day, index) => {
        if (index == 0) {
            future_Day_forcast +=`
            <div class="today_forcast" id="today_forcast">
                <img src="" alt="wether_icon" class="wether_icon">
                <div class="other">                    
                    <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
                    <div class="temp">Night - ${day.temp.night}&#176; C</div>
                    <div class="temp">Day - ${day.temp.day}&#176; C</div>
                </div>
            </div>
`
        } else {
            future_Day_forcast +=`
            <div class="remaining_day_forcast_item">
                <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
                <img src="" alt="wether_icon" class="wether_icon">
                <div class="temp">Night - ${day.temp.night}&#176; C</div>
                <div class="temp">Day - ${day.temp.day}&#176; C</div>
            </div>
            `
        }
    });
    future_forcast.innerHTML = future_Day_forcast;
    remaining_day_forcast.innerHTML = future_Day_forcast;


}

const get_wether_data = () => {
                        navigator.geolocation.getCurrentPosition((success) => {
                            // console.log(success);

                            let { latitude, longitude } = success.coords;

                            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
                                console.log(data);
                                show_wether_data(data);
                            })

                        });
}
get_wether_data()