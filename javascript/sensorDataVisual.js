var sensorStation = new sensorClass()
var chart
const exist =[]
function updateDataGraph(sensorId, newData, newLabels) {
  var sensor = sensorStation.getSpecificSensor(sensorId);
  var canvas = Chart.getChart("canvas_" + sensor.getName());
  
  if (!canvas) {
      console.error(`Chart not found for canvas id: canvas_${sensor.getName()}`);
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
      labels: [],//sensor.getDatasetTime(sensor.getId()),
      datasets: [{
        label: 'Visual of data',
        data: [],//sensor.getDataset(sensor.getId()),
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
        duration: 250
      }
    }
  });
  console.log(sensor.getDataset(sensor.getId()))
  updateDataGraph(sensor.getId(),sensor.getDataset(sensor.getId()),sensor.getDatasetTime(sensor.getId()))
}