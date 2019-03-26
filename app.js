window.addEventListener('load', ()=> {
  let long;
  let  lat;
  let temperatureDescription = document.querySelector(".temperature-description");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");

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
          const {temperature, summary} = data.currently;
          //set DOM elements from the api
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;

        });
    });
  }
  else{
    h1.textContent = "Please enable geolocation"
  }
});
