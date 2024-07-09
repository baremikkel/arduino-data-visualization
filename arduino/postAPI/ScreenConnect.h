#ifndef ScreenConnect_h
#define ScreenConnect_h

#include <Arduino.h>

class ScreenConnect {
  public:
    ScreenConnect(String sensorName, String sensorType, int minVal, int maxVal);
    void begin(String ssid, String password, String ip);
    int getId();
    String getName();
    String getType();
    int getMinVal();
    int getMaxVal();
    void setIPaddress(String ip);
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
    String getTime();
};

#endif
