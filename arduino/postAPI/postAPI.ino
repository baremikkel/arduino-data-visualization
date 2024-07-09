#include "ScreenConnect.h"

// Create a Device object globally
const char* ssid = "SkovboUdlejning";
const char* password = "jollywarthog77";
ScreenConnect tempSensor("TemperatureSensor", "Analog", 0, 4095);
#define ADC_INPUT 32

void setup() {
  pinMode(ADC_INPUT, INPUT);
  Serial.begin(115200);
  tempSensor.begin(ssid,password, "10.64.128.60");
  // Print the details of the device

}

void loop() {
  // Your main code
  int test = analogRead(ADC_INPUT);
  Serial.println(test);
  tempSensor.sendData(test,250);
  //delay(500);
}
