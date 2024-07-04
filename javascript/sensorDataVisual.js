var sensor = new sensorClass()

function showData(sensorId){
    sensor = sensor.getSpecificSensor(sensorId)
    //console.log(sensor.getName())
    const ctx = document.getElementById("canvas_"+sensor.getName());
    //console.log(ctx)
    console.log(sensor.getDataset(sensor.getId()))

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