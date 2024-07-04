const { disable } = require("express/lib/application");

//Collect the data from Api 
var data
async function fetchData(){
    try{
        const response = await fetch('http://localhost:3000/api/data')
        data = await response.json();
    //document.getElementById('dataDisplay').innerText += JSON.stringify(data[i].sensor);
    }
    catch{
        alert("Cannot connect to servers")
    }
    if(!data.length)
        alert("No data on endpoint")
        else {
            var sensor = new sensorClass()
        for (var i = 0; i < data.length; i++) {
            //if(sensor.getAllSensors.length<i)
            console.log(sensor.getId(sensor.getAllSensors().length))
            sensor = new sensorClass(data[i].name, data[i].sensor_type, data[i].timeStamp,data[i].data,data[i].dataRange_low, data[i].dataRange_high, data[i].id)
            addToDropdown(JSON.stringify(sensor.getName()),sensor)
        }
        }
}

function addToDropdown(string, sensor){
    console.log(string)
    string = string.substring(1, string.length-1)
    var button = document.createElement("button")

    button.innerText += string.substring(string)
    button.onclick = function(){showTabDisplay(string, sensor, button)}

    document.getElementById("dropdown").appendChild(button).appendChild(document.createElement("br"))
    
}

function showTabDisplay(sensor_string,sensor,button) {
    var div = document.createElement("div")
    div.id = "showTab_"+sensor_string.toString()
    document.getElementById("showTab").appendChild(div)
    var p = document.createElement("p")
    p.innerHTML = sensor.toString()
    document.getElementById(div.id.toString()).appendChild(p)
    button.remove()
    var button = document.createElement("button")
    button.innerText = "Show datasheet"
    button.onclick = function(){showData(sensor.getId()); button.disabled = true}
    div.appendChild(button)
    var canvas = document.createElement("canvas")
    canvas.id = "canvas_"+sensor_string.toString()
    div.appendChild(canvas)
}