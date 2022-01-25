const kelvinToCelcious = (kelvin) => {
  return Math.floor(kelvin - 273.15);
};

const getWeatherData = async (city) => {
  const apiKey = "21d807407fc08f0dca752a98c2c9b2d1";
  const baseURL = "https://api.openweathermap.org/";
  const api = `${baseURL}data/2.5/weather?q=${city}&appid=${apiKey}&lang=es`;
  const response = await fetch(api);

  if (response.status !== 200) {
    return false;
  }
  return await response.json();
};

const getCity = () => {
  const city = document.getElementById("cityInput").value;
  return city;
};

const renderCard = () => {
  // Obtener la ciudad
  const city = getCity();
  // Obtener los datos
  const weatherData = getWeatherData(city);
  // Armar y mostrar la tarjeta
  weatherData.then((data) => {
    if (document.querySelector(".place_icon") !== null)
      document.querySelector(".place_icon").remove();
    if (document.querySelector(".details") !== null)
      document.querySelector(".details").remove();

    const mountNode = document.querySelector("#card_container");
    mountNode.style.padding = "20px";

    const place_icon = document.createElement("div");
    place_icon.className = "place_icon";

    const place = document.createElement("p");
    place.className = "place";
    place.textContent = `${data.name}, ${data.sys.country}`;

    const img = document.createElement("img");
    img.className = "icon";
    img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    const details = document.createElement("div");
    details.className = "details";

    const temperature = document.createElement("p");
    temperature.className = "temperature";
    temperature.textContent = `${kelvinToCelcious(data.main.temp)}°C`;

    const description = document.createElement("p");
    description.className = "description";
    description.textContent = data.weather[0].description;

    place_icon.append(place, img);
    details.append(temperature, description);
    mountNode.append(place_icon, details);
  });
};

const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", renderCard);
