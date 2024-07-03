//Collect the data from Api
var data
async function fetchData(){
    const response = await fetch('http://localhost:3000/api/data')
    data = await response.json();    
    for (var i = 0; i < data.length; i++)
        addToDropdown(JSON.stringify(data[i].sensor))
        //document.getElementById('dataDisplay').innerText += JSON.stringify(data[i].sensor);

}

function addToDropdown(string){
    string = string.substring(1, string.length-1)
    var a = document.createElement("button")

    a.innerText += string.substring(string)
    a.onclick = function(){showTabDisplay(string)}

    document.getElementById("dropdown").appendChild(a).appendChild(document.createElement("br"))
    
}

function showTabDisplay(sensor) {
    var div = document.createElement("div")
    div.id = "showTab_"+sensor.toString()
    document.getElementById("showTab").appendChild(div)
}