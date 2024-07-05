const sensors = [];
const dataset = [];
const dataset_time = [];
class sensorClass {

  constructor(name, sensor_type, timeStamp, data, dataRange_low, dataRange_high, id) {
    // Ensure data and timeStamp are arrays
    if (!Array.isArray(data)) {
        data = [data];
    }
    if (!Array.isArray(timeStamp)) {
        timeStamp = [timeStamp];
    }

    // Check if the sensor with the same id already exists
    let existingSensorIndex = sensors.findIndex(sensor => sensor.id === id);

    if (existingSensorIndex !== -1) {
        // If the sensor already exists, update the dataset and dataset_time arrays
        dataset[id].push(...data);
        dataset_time[id].push(...timeStamp);
    } else {
        // If the sensor does not exist, create a new one
        if (name) {
            if (!dataset[id]) {
                dataset[id] = [];
                dataset_time[id] = [];
            }
            this.name = name;
            this.sensor_type = sensor_type;
            this.dataRange_low = dataRange_low;
            this.dataRange_high = dataRange_high;
            this.id = id;
            this.timeStamp = timeStamp;
            dataset_time[id].push(...timeStamp);
            this.data = data;
            dataset[id].push(...data);
            sensors.push(this);
        }
    }
}
  // Getters
  getName() {
    return this.name;
  }
  getId() {
    return this.id
  }
  getSensorType() {
    return this.sensor_type;
  }

  getTimeStamp() {
    return this.timeStamp;
  }

  getData() {
    return this.data;
  }

  getDataRangeLow() {
    return this.dataRange_low;
  }

  getDataRangeHigh() {
    return this.dataRange_high;
  }
  getAllSensors() {
    return sensors;
  }
  getDataset(id) {
    return dataset[id]
  }
  getDatasetTime(id) {
    return dataset_time[id]
  }
  toString() {
    return (`Name: ${this.getName()}<br/>Type: ${this.getSensorType()}<br/>Timestamp: ${this.getTimeStamp()}<br/>Data: ${this.getData()}<br/>Range: ${this.getDataRangeLow()} - ${this.getDataRangeHigh()} <br/> Id: ${this.getId()}`);
  }
  getSpecificSensor(id) {
    return sensors[id]
  }
  static hasSensor(id) {
    return sensors.some(sensor => sensor.id === id)
  }
  // Setters
  setName(newName) {
    this.name = newName;
  }

  setSensorType(newSensorType) {
    this.sensor_type = newSensorType;
  }

  setTimeStamp(newTimeStamp) {
    this.timeStamp = newTimeStamp;
  }

  setData(newData) {
    this.data = newData;
  }

  setDataRangeLow(newDataRangeLow) {
    this.dataRange_low = newDataRangeLow;
  }

  setDataRangeHigh(newDataRangeHigh) {
    this.dataRange_high = newDataRangeHigh;
  }

}
