const form=document.getElementById("form");
const latitudeInput=document.getElementById("Latitude");
const longitudeInput=document.getElementById("Longitude");
const resultcontainer=document.getElementById("result");
const aqiresult=document.getElementById("aqi");
const coresult=document.getElementById("co");
const no2result=document.getElementById("no2");
const o3result=document.getElementById("o3");
const pm2result=document.getElementById("pm2");
const pm10result=document.getElementById("pm10");

form.addEventListener("submit",(event)=>{
    event.preventDefault();
    const latitude=latitudeInput.value;
    const longitude=longitudeInput.value; 
    const url = `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${latitude}&lon=${longitude}&appid=6e95ce66c1e0878110ea6f23de001086`;
    const apiKey = '6e95ce66c1e0878110ea6f23de001086';
    
    try{
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(result=>{
                if(result.list[0].main.aqi===1){
                    aqiresult.textContent="Good";
                }
                else if(result.list[0].main.aqi===2){
                    aqiresult.textContent="Fair";
                }
                else if(result.list[0].main.aqi===3){
                    aqiresult.textContent="Moderate";
                }
                else if(result.list[0].main.aqi===4){
                    aqiresult.textContent="Poor";
                }
                else{
                    aqiresult.textContent="Very Poor";
                }
                
                coresult.textContent = result.list[0].components.co;
                no2result.textContent = result.list[0].components.no2;
                o3result.textContent = result.list[0].components.o3;
                pm2result.textContent = result.list[0].components.pm2_5;
                pm10result.textContent = result.list[0].components.pm10;
                resultcontainer.style.display='flex';
            });
        }
        catch(error){
            console.error("Operation Failed!!");
            alert("Failed to fetch air quality data.")
        }  
});