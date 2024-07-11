const { disable } = require("express/lib/application");

var dataSize
var data

//Collect the data from Api 
async function fetchData() {
    try {
        const response = await fetch('http://localhost:3000/api/data')
        data = await response.json();
    }
    catch (error) {
        return error
    }
    if (!data.length){
        document.getElementById('showTab').innerHTML = ''
        document.getElementById('dropdown').innerHTML = ''
        sensorClass.clearArrays()
        data = []
        dataSize = undefined
    }
    else {
        if(dataSize < data.length || dataSize == undefined){
            dataSize = data.length
            var sensor
            for (var i = 0; i < data.length; i++) {
                sensor = new sensorClass(data[i].name, data[i].sensor_type, data[i].timeStamp, data[i].data, data[i].dataRange_low, data[i].dataRange_high, data[i].id)
                if(sensorClass.hasSensor(sensor.getId(data[i].id))) {
                    addToButtonGroup(JSON.stringify(data[i].name), sensor)
                }
                if(!(i < data.length-1)) {
                    updateDataGraph(data[i].id, data[i].data, data[i].timeStamp)
                }    
            }
        }
    }
}

function addToButtonGroup(string, sensor) {
    string = string.substring(1, string.length - 1)
    var button = document.createElement("button")
    button.innerText += string
    button.onclick = function () { showTabDisplay(string, sensor, button) }
    document.getElementById("buttonGroup").appendChild(button).appendChild(document.createElement("br"))
}

function showTabDisplay(sensor_string, sensor, button_element) {
    //div element
    var div_element = document.createElement("div")
    div_element.id = "showTab_" + sensor_string.toString()
    document.getElementById("showTab").appendChild(div_element)
    //button element
    var paragraph_element = document.createElement("p")
    paragraph_element.innerHTML = sensor.toString()
    document.getElementById(div_element.id.toString()).appendChild(paragraph_element)
    button_element.remove()
    //button element
    var button_element = document.createElement("button")
    button_element.innerText = "Show datasheet"
    button_element.onclick = function () { showData(sensor.getId()); button_element.disabled = true }
    div_element.appendChild(button_element)
    //Canvas element
    var canvas = document.createElement("canvas")
    canvas.id = "canvas_" + sensor_string.toString()
    div_element.appendChild(canvas)
}
function startFetching(){ 
    fetchData()
    setInterval(fetchData,1000)
}
