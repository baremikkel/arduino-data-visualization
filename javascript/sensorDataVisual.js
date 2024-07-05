var sensor = new sensorClass()

function showData(sensorId) {
  sensor = sensor.getSpecificSensor(sensorId)
  const ctx = document.getElementById("canvas_" + sensor.getName());
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: sensor.getDatasetTime(sensor.getId()),
      datasets: [{
        label: 'Visual of data',
        data: sensor.getDataset(sensor.getId()),
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
      }
    }
  });
}