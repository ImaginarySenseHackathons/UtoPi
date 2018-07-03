#include <SPI.h>
#include <RH_RF95.h>
#include <SoftwareSerial.h>
#include "TinyGPS.h"
TinyGPS gps;
SoftwareSerial ss(10, 11);

/* for feather32u4 */
#define RFM95_CS 8
#define RFM95_RST 4
#define RFM95_INT 7


// Change to 900.0 or other frequency, must match RX's freq!
#define RF95_FREQ 900.0

// Singleton instance of the radio driver
RH_RF95 rf95(RFM95_CS, RFM95_INT);
int jobState = 0;


void setup()
{
  // Push Button
  pinMode(13, INPUT);

  // Lora OUTPUT
  pinMode(RFM95_RST, OUTPUT);
  digitalWrite(RFM95_RST, HIGH);

  Serial.begin(115200);
  while (!Serial) {
    delay(1);
  }
  ss.begin(9600);
  randomSeed(analogRead(0));

  delay(100);

  // manual reset
  digitalWrite(RFM95_RST, LOW);
  delay(10);
  digitalWrite(RFM95_RST, HIGH);
  delay(10);

  while (!rf95.init()) {
    Serial.println("LoRa radio init failed");
    while (1);
  }
  Serial.println("LoRa radio init OK!");

  // Defaults after init are 900.0MHz, modulation GFSK_Rb250Fd250, +13dbM
  if (!rf95.setFrequency(RF95_FREQ)) {
    Serial.println("setFrequency failed");
    while (1);
  }
  Serial.print("Set Freq to: "); Serial.println(RF95_FREQ);

  // Defaults after init are 900.0MHz, 13dBm, Bw = 125 kHz, Cr = 4/5, Sf = 128chips/symbol, CRC on

  // The default transmitter power is 13dBm, using PA_BOOST.
  // If you are using RFM95/96/97/98 modules which uses the PA_BOOST transmitter pin, then
  // you can set transmitter powers from 5 to 23 dBm:
  rf95.setTxPower(23, false);
}

int16_t packetnum = 0;  // packet counter, we increment per xmission
bool didJob = false;
bool hasSend = true;
long randomNumber;

float lat = 0.0;
float lng = 0.0;

double f_round(double dval, int n)
{
    char l_fmtp[32], l_buf[64];
    char *p_str;
    sprintf (l_fmtp, "%%.%df", n);
    if (dval>=0)
            sprintf (l_buf, l_fmtp, dval);
    else
            sprintf (l_buf, l_fmtp, dval);
    return ((double)strtod(l_buf, &p_str));

}

void loop()
{
  delay(200); // Wait 1 second between transmits, could also 'sleep' here!

  // Allow only one sending 
  jobState = digitalRead(13);
  if (jobState == HIGH && didJob != true && hasSend) {
    didJob = true;
    hasSend = false;
  } else if (jobState == LOW) {
    didJob = false;
  }

  if (!hasSend) {
    // Compose the message
    char *radiopacket;
    String tempString;
    randomNumber = random(3);
    switch (randomNumber) {
      case 0:
        tempString = "{\"user\":1,\"status\":\"Blocked\",\"lat\":" + String(lat) + ",\"lng\":" + String(lng) + ",\"timestamp\":1518783132,\"description\":\"Arbol bloquea entrada al estacionamiento\",\"place\":\"Doctor's Center Hospital'\"}";
        break;
      case 1:
        tempString = "{\"user\":1,\"status\":\"Blocked\",\"lat\":" + String(lat) + ",\"lng\":" + String(lng) + ",\"timestamp\":1518783132,\"description\":\"Arbol bloquea entrada al estacionamiento\",\"place\":\"Doctor's Center Hospital'\"}";
        break;
      default:
        tempString = "{\"user\":1,\"status\":\"Blocked\",\"lat\":" + String(lat) + ",\"lng\":" + String(lng) + ",\"timestamp\":1518783132,\"description\":\"Arbol bloquea entrada al estacionamiento\",\"place\":\"Doctor's Center Hospital'\"}";
        break;
    }

    // Convert message String to Char Array
    radiopacket = tempString.c_str();
    
    delay(10);
    rf95.send((uint8_t *)radiopacket, 200);
    
    // Waiting for packet to complete...
    delay(10);
    rf95.waitPacketSent();
    // Now wait for a reply
    uint8_t buf[RH_RF95_MAX_MESSAGE_LEN];
    uint8_t len = sizeof(buf);

    // Waiting for Reply
    if (rf95.waitAvailableTimeout(1000))
    {
      // Should be a reply message for us now
      if (rf95.recv(buf, &len))
      {
        // Getting Reply from the Receiver
        Serial.println((char*)buf);
        hasSend = true;
      }
      else
      {
        Serial.println("Receive failed");
      }
    }
    else
    {
      Serial.println("No reply, is there a listener around?");
    }

  }
  bool newData = false;
  unsigned long chars;
  unsigned short sentences, failed;

  // For one second we parse GPS data and report some key values
  for (unsigned long start = millis(); millis() - start < 1000;)
  {
    while (ss.available())
    {
      char c = ss.read();
      if (gps.encode(c)) // Did a new valid sentence come in?
        newData = true;
    }
  }

  if (newData)
  {
    float flat, flon;
    unsigned long age;
    gps.f_get_position(&flat, &flon, &age);
    lat = flat;
    lng = flon;
  }

}
