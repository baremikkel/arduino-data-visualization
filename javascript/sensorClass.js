const sensors = [];
const dataset = [];
const dataset_time = [];
class sensorClass {
    
    constructor(name, sensor_type,timeStamp,data,dataRange_low,dataRange_high,id){
      if(name != null) {
        if (!dataset[id]) {
          dataset[id] = [];
          dataset_time[id] = [];
          dataset[id].push(0)
          dataset_time[id].push(0)
        }
      this.name = name;
      this.sensor_type = sensor_type;
      this.dataRange_low = dataRange_low;
      this.dataRange_high = dataRange_high;
      this.id = id
      console.log(id)
        this.timeStamp = timeStamp;
        dataset_time[id].push(timeStamp)
        this.data = data;
        dataset[id].push(data)
        sensors.push(this)
        console.log(dataset_time[id])
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
  getAllSensors(){
    return sensors;
  }
  getDataset(id){
    return dataset[id]
  }
  getDatasetTime(id){
    return dataset_time[id]
  }
  toString(){
    return (`Name: ${this.getName()}<br/>Type: ${this.getSensorType()}<br/>Timestamp: ${this.getTimeStamp()}<br/>Data: ${this.getData()}<br/>Range: ${this.getDataRangeLow()} - ${this.getDataRangeHigh()} <br/> Id: ${this.getId()}`);
  }
  getSpecificSensor(id){
    return sensors[id]
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
