var sensorStation = new sensorClass()
var chart
const exist =[]
function updateDataGraph(sensorId, newData, newLabels) {
  var sensor = sensorStation.getSpecificSensor(sensorId);
  var canvas = Chart.getChart("canvas_" + sensor.getName());
  
  if (!canvas) {
      console.error(`Chart not found`)
      return;
  }
  if (!Array.isArray(newData)) {
    newData = [newData];
}
if (!Array.isArray(newLabels)) {
    newLabels = [newLabels];
}
  var dataset = canvas.data.datasets[0]; // Assuming a single dataset for simplicity
  var labels = canvas.data.labels;

  // Add only new data points and labels
  newData.forEach((dataPoint, index) => {
      if (!labels.includes(newLabels[index])) {
          dataset.data.push(dataPoint);
          labels.push(newLabels[index]);
      }
  });
  if(dataset.data.length > 15){
    dataset.data.shift()
    labels.shift()
  }

  canvas.update()
}

function showData(sensor) {
  sensor = sensorStation.getSpecificSensor(sensor)
  const ctx = document.getElementById("canvas_" + sensor.getName());
  exist[sensor.getId()] = true;
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Visual of data',
        data: [],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: sensor.getDataRangeHigh(),
          min: sensor.getDataRangeLow()
        }
      },
      animation: {
        duration: 125
      }
    }
  });
  console.log(sensor.getDataset(sensor.getId()))
  updateDataGraph(sensor.getId(),sensor.getDataset(sensor.getId()),sensor.getDatasetTime(sensor.getId()))
}