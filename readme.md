# Arduino data on website
Dette er et projekt der tillader dig at sende data fra en Arduino til en website der kører lokalt på din bærbar
## Arduino
I arduino skal du bruge klassen ScreenConnect.cpp

helt i toppen skal du angive dit internets ssid og password
```cpp
const char* ssid = "WiFiName";
const char* password = "WiFiPassword";
ScreenConnect myDevice("Deviceame", "temperature-sensor", 0, 128);
```

I din ``void setup()`` skal du så starte processen i at sende data til hjemmesiden.
angiv dit ssid og password ``myDevice.begin(``**ssid, password,** ``"10.10.10.10")``
Den sidste parameter skal være din pc's ipaddresse.

På Windows kan du åbne `command promt` ved at søge `cmd`. Inde i command promten skal du skrive *ipconfig* hvilket viser din ip.

Den linje du skal bruge er "IPv4 Address", skriv de tal ind i ``myDevice.begin()``
ScreenConnect sørger for at skabe forbindelse til internettet så det skal du ikke tænke på det eneste du skal gøre er at bruge `sendData()` funktionen så i din loop vil det se sådanne ud

```cpp
void loop() {  // Your main code
  myDevice.sendData(data_value,250);
}
```
I eksemplet er første parameter den værdi du gerne vil sende til hjemmesiden, og den anden parameter er delay i mellem dataen der bliver sendt.
## Website
For at få hjemmesiden til at virke skal du have installeret Node.js se nedenunder
### Node js server
Åben terminalen ved at trykke ``Ctrl + Shift + æ`` 
Installér node.js hvis det ikke allerede er installeret
``npm install express body-parser``

Start node.js serveren ved at skrive
``node ./javascript/server.js``

Efter at terminalen har skrevet "*Server running on http://localhost:3000*"
Klik på linket http://localhost:3000 og se at siden virker.

### JSON syntax
Når arduinoen sender noget data til hjemmesiden bruger den en API.
API følger en JSON struktur. nedenfår kan du hvordan det er sat op.
```JSON
{
    "id": int,
    "name": "sensor-name",
    "sensor_type": "type",
    "timeStamp": "TT-MM-SS",
    "data": float,
    "dataRange_low": float,
    "dataRange_high": float
}
```
For at holde øje med hvilken sensor der sender data afgiver arduinoen den et id, dette id er anderledes for hver sensor i systemet.

For at gøre det mere personligt tildeler man sensoren med et navn dette kan for eksempel være `minSensor`.

Sensor_type bliver brugt til at angive hvilken sensor du bruger for eksempel `temperature-sensor`, det er vigtigt at du ikke laver mellemrum når du angiver name og type.

`timeStamp` bliver brugt til at vise tiden på x-aksen.

Ved brug af `data`, kan Arduinoen sende den data den måler til hjemmesiden og er den værdi der bliver vist på grafen

`dataRange_low` og `dataRange_high` er værdierne der udgør y-aksen, nemlig den mindste og største værdi sensoren kan måle.