import Search from "./assets/search.svg";
import Humidity from "./assets/humidity.svg";
import WindSpeed from "./assets/wind.svg";
import { useEffect, useRef, useState } from "react";
import ClearSky from "./assets/01d.png";
import ClearSkyNight from "./assets/01n.png";
import FewCloud from "./assets/02d.png";
import FewCloudNight from "./assets/02n.png";
import ScatteredCloud from "./assets/03d.png";
import ScatteredCloudNight from "./assets/03n.png";
import BrokenCloud from "./assets/04d.png";
import BrokenCloudNight from "./assets/04n.png";
import ShowerRain from "./assets/09d.png";
import ShowerRainNight from "./assets/09n.png";
import Rain from "./assets/10d.png";
import RainNight from "./assets/10n.png";
import Thunderstorm from "./assets/11d.png";
import ThunderstormNight from "./assets/11n.png";
import Snow from "./assets/13d.png";
import SnowNight from "./assets/13n.png";
import Mist from "./assets/50d.png";
import MistNight from "./assets/50n.png";

export default function Weather() {
  const [dataWeather, setDataWeather] = useState("Jakarta");
  const searchInput = useRef();

  const search = async (city) => {
    const Icons = {
      "01d": ClearSky,
      "01n": ClearSkyNight,
      "02d": FewCloud,
      "02n": FewCloudNight,
      "03d": ScatteredCloud,
      "03n": ScatteredCloudNight,
      "04d": BrokenCloud,
      "04n": BrokenCloudNight,
      "09d": ShowerRain,
      "09n": ShowerRainNight,
      "10d": Rain,
      "10n": RainNight,
      "11d": Thunderstorm,
      "11n": ThunderstormNight,
      "13d": Snow,
      "13n": SnowNight,
      "50d": Mist,
      "50n": MistNight,
    };

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}&units=metric`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert("Kota tidak ditemukan");
        return;
      }

      console.log(data);
      setDataWeather({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        location: data.name,
        temperature: Math.floor(data.main.temp),
        icon: Icons[data.weather[0].icon],
      });
    } catch (error) {
      setDataWeather(false);
    }
  };

  useEffect(() => {
    search("Jakarta");
  }, []);

  return (
    <div className="p-8 bg-gradient-to-tr from-blue-600 to-blue-900 rounded-2xl w-80 md:w-99">
      <div className="flex gap-2">
        <input ref={searchInput} type="text" placeholder="Cari Lokasi" className="bg-white p-3 rounded-3xl flex-1 placeholder:text-black focus:outline-0" />
        <button onClick={() => search(searchInput.current.value)} className="bg-white p-3 rounded-full cursor-pointer hover:bg-zinc-200">
          <img src={Search} width={30} />
        </button>
      </div>
      <div className="mb-8">
        <h2 className="text-3xl text-amber-50 mt-8 ms-1 font-semibold">{dataWeather.location}</h2>
        <div className="flex items-center justify-between">
          <h2 className="text-amber-50 text-6xl font-bold">{dataWeather.temperature}°</h2>
          <img src={dataWeather.icon} width={100} />
        </div>
      </div>
      <div>
        <div className="flex justify-between gap-2">
          <div className="flex gap-2 bg-white/15 p-4 flex-1 rounded-2xl">
            <img src={Humidity} width={25} />
            <p className="text-lg font flex flex-col text-amber-50">
              Humidity <span className="font-bold">{dataWeather.humidity}</span>
            </p>
          </div>
          <div className="flex gap-2 bg-white/15 p-4 flex-1 rounded-2xl">
            <img src={WindSpeed} width={25} />
            <p className="text-lg font flex flex-col text-amber-50">
              Wind Speed <span className="font-bold">{dataWeather.windSpeed} Km/h</span>
            </p>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
