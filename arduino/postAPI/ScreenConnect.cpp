#include "ScreenConnect.h"

#ifdef ESP8266
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#elif defined(ESP32)
#include <WiFi.h>
#include <HTTPClient.h>
#endif
HTTPClient http;
bool cleared;
unsigned long previousMillis = 0;

// Constructor definition
ScreenConnect::ScreenConnect(String sensorName, String sensorType, int minVal, int maxVal) {
  _id = -1;
  _sensorName = sensorName;
  _sensorType = sensorType;
  _minVal = minVal;
  _maxVal = maxVal;
}
String ScreenConnect::getTime() {
  unsigned long currentMillis = millis();
  unsigned long hours = (currentMillis / 3600000) % 24; // 1 hour = 3600000 ms
  unsigned long minutes = (currentMillis / 60000) % 60; // 1 minute = 60000 ms
  unsigned long seconds = (currentMillis / 1000) % 60;  // 1 second = 1000 ms
  unsigned long milliseconds = currentMillis % 1000;

  // Format the time as HH:MM:SS:MMM
  char timeString[13]; // HH:MM:SS:MMM -> 12 characters + null terminator
  sprintf(timeString, "%02lu:%02lu:%02lu:%03lu", hours, minutes, seconds, milliseconds);

  return String(timeString);
}

void ScreenConnect::begin(String ssid, String password, String ip) {
  _id++;
  setIPaddress(ip);
  WiFi.begin(ssid, password);
}
// Method definitions
int ScreenConnect::getId() {
  return _id;
}

String ScreenConnect::getName() {
  return _sensorName;
}

String ScreenConnect::getType() {
  return _sensorType;
}

int ScreenConnect::getMinVal() {
  return _minVal;
}

int ScreenConnect::getMaxVal() {
  return _maxVal;
}
void ScreenConnect::setIPaddress(String ip) {
  _ip = "http://" + ip + ":3000/api/data";
}

void ScreenConnect::sendData(float sensorData, int delayMillis) {
  if (WiFi.status() == WL_CONNECTED) { // Check if the device is connected to WiFi
    http;
    if (!cleared) {
      // Initialize HTTP client for DELETE request
      http.begin(_ip); // Specify the URL for DELETE request
      int httpResponseCode = http.sendRequest("DELETE"); // Send the DELETE request
      if (httpResponseCode > 0) {
        String response = http.getString();
        //Serial.println("DELETE Response Code: " + String(httpResponseCode));
        //Serial.println("DELETE Response: " + response);
      } else {
        Serial.println("Error on sending DELETE: " + String(httpResponseCode));
      }

      http.end(); // Free resources
      cleared = true; // Mark as cleared to avoid repeated DELETE requests
    }
    unsigned long currentMillis = millis();

    if (currentMillis - previousMillis >= delayMillis) {
      previousMillis = currentMillis;
      http.begin(_ip); // Specify the URL
      http.addHeader("Content-Type", "application/json"); // Specify content-type header

      // Data to send to the API
      String jsonData = "{";
      jsonData += "\"id\": " + String(_id) + ",";
      jsonData += "\"name\": \"" + String(_sensorName) + "\",";
      jsonData += "\"sensor_type\": \"" + String(_sensorType) + "\",";
      jsonData += "\"timeStamp\": \"" + getTime() + "\",";
      jsonData += "\"data\": " + String(sensorData) + ",";
      jsonData += "\"dataRange_low\": " + String(_minVal) + ",";
      jsonData += "\"dataRange_high\": " + String(_maxVal);
      jsonData += "}";

      int httpResponseCode = http.POST(jsonData);
      if (httpResponseCode > 0) {
        String response = http.getString();
        //Serial.println(httpResponseCode);
        //Serial.println(response);
      } else {
        Serial.print("Error on sending POST: ");
        Serial.println(httpResponseCode);
      }

      http.end(); // Free resources
    } else {
      Serial.println("WiFi Disconnected");

    }


  } else {
    while (WiFi.status() != WL_CONNECTED) {
      delay(1000);
      Serial.println("Connecting to WiFi...");
    }
    cleared = false;
    Serial.println("Connected to WiFi");
  }
}
