window.addEventListener('load', ()=> {
  let long;
  let  lat;
  let temperatureDescription = document.querySelector(".temperature-description");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector('.temperature');
  const temperatureSpan = document.querySelector('.temperature span');

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position=>{
      // console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/6dc51811cddb9b53a4bc454a6365f052/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          // console.log(data);
          const {temperature, summary, icon} = data.currently;
          //set DOM elements from the api
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          //set icon
          setIcons(icon, document.querySelector('.icon'));

          //CONVERT C -> f
          let celsius = (temperature - 32) * (5/9)

          //change temp to C/F
          temperatureSection.addEventListener('click', ()=>{
            if(temperatureSpan.textContent === "F"){
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = celsius.toFixed(2);
            }
            else{
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  }
  else{
    h1.textContent = "Please enable geolocation"
  }

  function setIcons(icon, iconID){
      const skycons = new Skycons({color:"white"});
      // conform to skycons naming convention
      const currentIcon = icon.replace(/-/g,"_").toUpperCase();
      skycons.play()
      return skycons.set(iconID, Skycons[currentIcon]);
  }
});
