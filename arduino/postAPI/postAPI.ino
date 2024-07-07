#include "Device.h"

// Create a Device object globally
Device myDevice("TemperatureSensor", "Analog", 0, 1023,"192.168.1.89");

void setup() {
  Serial.begin(9600);
  myDevice.begin("Tystrupvej38_5G","L1nksysM3sh");
  // Print the details of the device

}

void loop() {
  // Your main code
  myDevice.sendData(47,1000);
}
