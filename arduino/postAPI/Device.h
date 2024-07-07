#ifndef Device_h
#define Device_h

#include <Arduino.h>

class Device {
  public:
    Device(String sensorName, String sensorType, int minVal, int maxVal, String ip);
    void begin(String ssid, String password);
    int getId();
    String getName();
    String getType();
    int getMinVal();
    int getMaxVal();
    void sendData(float sensorData, int delayMillis);

  private:
    int _id;
    String _sensorName;
    String _sensorType;
    int _minVal;
    int _maxVal;
    const char* _ssid;
    const char* _password;
    String _ip;
    String getTime()
};

#endif
