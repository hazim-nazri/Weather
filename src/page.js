const { app, BrowserWindow } = require('electron');
const path = require('node:path');


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'page.html'));


};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow(); 

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.



function buttonClicked(){
  const country1 = document.getElementById('country1-input').value.toLowerCase();


  // Fetch first country details
  fetch(`https://api.weatherapi.com/v1/forecast.json?key=32804b24a847407391c53709241010&q=${country1}`)
  .then(response => response.json())
  .then(data => {
      let countryData = data;
      document.getElementById("country1").innerHTML = `${countryData.location.country}`;
      document.getElementById("region1").innerHTML = `${countryData.location.region}`;

      document.getElementById("current_temp_c1").innerHTML = `${countryData.current.temp_c}°C`;
      document.getElementById("forecast_temp1").innerHTML = `${countryData.forecast.forecastday[0].day.avgtemp_c}°C`;
      document.getElementById("wind_speed_mph1").innerHTML = `${countryData.current.wind_mph}`;
      document.getElementById("humidity1").innerHTML = `${countryData.current.humidity}%`;
      document.getElementById("rain1").innerHTML = `${countryData.forecast.forecastday[0].day.daily_chance_of_rain}%`;
      document.getElementById("snow1").innerHTML = `${countryData.forecast.forecastday[0].day.daily_chance_of_snow}%`;
      document.getElementById("wheather1").innerHTML = `${countryData.forecast.forecastday[0].day.condition.text}`;
      document.getElementById("time1").innerHTML = `${countryData.location.localtime}`;

        // Set the image source instead of text content
      const weatherIcon = document.getElementById('weather-icon');
      weatherIcon.src =`https:${countryData.current.condition.icon}` ;
      weatherIcon.alt = "Weather icon";

      recommendActivities(countryData.forecast.forecastday[0].day.daily_chance_of_rain);
    });
}

function recommendActivities(chanceOfRain) {
  const recommendationElement = document.getElementById("recommendation");
  
  if (chanceOfRain < 30) {
    recommendationElement.innerHTML = "Recommended Activities: Hiking, Paragliding";
  } else {
    recommendationElement.innerHTML = "Not suggested for outdoor activities";
  }
}

//hivewiybgcoewbc
function gotocrud(){
  window.location.href = 'index.html';
}

