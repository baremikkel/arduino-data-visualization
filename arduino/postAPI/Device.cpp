#include "Device.h"

#ifdef ESP8266
  #include <ESP8266WiFi.h>
  #include <ESP8266HTTPClient.h>
#elif defined(ESP32)
  #include <WiFi.h>
  #include <HTTPClient.h>
#endif
HTTPClient http;
bool cleared;
// Constructor definition
Device::Device(String sensorName, String sensorType, int minVal, int maxVal, String ip) {
  _id = -1;
  _sensorName = sensorName;
  _sensorType = sensorType;
  _minVal = minVal;
  _maxVal = maxVal;
  _ip = "http://"+ip+":3000/api/data";
}
void Device::begin(String ssid, String password){
  _id++;
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  cleared = false;
  Serial.println("Connected to WiFi");
}
// Method definitions
int Device::getId() {
  return _id;
}

String Device::getName() {
  return _sensorName;
}

String Device::getType() {
  return _sensorType;
}

int Device::getMinVal() {
  return _minVal;
}

int Device::getMaxVal() {
  return _maxVal;
}

void Device::sendData(float sensorData, int delayMillis) {
  if (WiFi.status() == WL_CONNECTED) { // Check if the device is connected to WiFi
    http;
    if (!cleared) {
      // Initialize HTTP client for DELETE request
      http.begin(_ip); // Specify the URL for DELETE request
      int httpResponseCode = http.sendRequest("DELETE"); // Send the DELETE request
      
      if (httpResponseCode > 0) {
        String response = http.getString();
        Serial.println("DELETE Response Code: " + String(httpResponseCode));
        Serial.println("DELETE Response: " + response);
      } else {
        Serial.println("Error on sending DELETE: " + String(httpResponseCode));
      }
      
      http.end(); // Free resources
      cleared = true; // Mark as cleared to avoid repeated DELETE requests
    }
      
    http.begin(_ip); // Specify the URL
    http.addHeader("Content-Type", "application/json"); // Specify content-type header

    // Data to send to the API
    String jsonData = "{";
    jsonData += "\"id\": " + String(_id) + ",";
    jsonData += "\"name\": \"" + String(_sensorName) + "\",";
    jsonData += "\"sensor_type\": \"" + String(_sensorType) + "\",";
    jsonData += "\"timeStamp\": \"" + String("time") + "\",";
    jsonData += "\"data\": " + String(sensorData) + ",";
    jsonData += "\"dataRange_low\": " + String(_minVal) + ",";
    jsonData += "\"dataRange_high\": " + String(_maxVal);
    jsonData += "}";

    int httpResponseCode = http.POST(jsonData);
    Serial.println(_ip);
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println(httpResponseCode);
      Serial.println(response);
    } else {
      Serial.print("Error on sending POST: ");
      Serial.println(httpResponseCode);
    }

    http.end(); // Free resources
  } else {
    Serial.println("WiFi Disconnected");
  }

  delay(delayMillis);
}
