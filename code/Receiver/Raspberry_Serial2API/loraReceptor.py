import serial
import requests
import json
 
port = "/dev/ttyACM0"
 
def parseData(data):
    #print data
    if data[0:4] == "{\"us":
        r = requests.post(url = "http://localhost:1337/report/blockedstreet", data = json.loads(data))
        response = r.json()
        print response
        #print data
 
ser = serial.Serial(port, baudrate = 9600, timeout = 1)
while True:
   data = ser.readline()
   parseData(data)
