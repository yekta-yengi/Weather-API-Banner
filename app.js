window.addEventListener('load',() => {
    let long;
    let lat;
    let tempDesc = document.querySelector('#temperature-description');
    let tempDegree = document.querySelector('#temperature-degree');
    let locTimeZone = document.querySelector('#location-timezone');
    let cityName = document.querySelector('#city-name');
    let icon = document.querySelector('.icon');
    let time = document.querySelector('#ob-time');


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            apikey = "YOUR API KEY" ; // Get API key from weatherbit.io
            
            const api = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=${apikey}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    //console.log(data);
                    const {temp, timezone, city_name , ob_time} = data.data[0];
                    tempDegree.textContent = temp;
                    tempDesc.textContent = data.data[0].weather.description;
                    locTimeZone.textContent = timezone;
                    cityName.textContent = city_name;
                    time.textContent = ob_time;
                    iconID = data.data[0].weather.icon;
                    setImage(iconID);
                });

                
        });
    }else{
        h1.textContent = "Please give permission to location service";
    }
    
    function setImage(iconID){
        let imgElement = document.createElement('img');
        imgElement.setAttribute("src", "./icons/" + iconID + ".png");
        imgElement.setAttribute("width", "32" );
        imgElement.setAttribute("height", "32" );
        icon.appendChild(imgElement);  
    }

});