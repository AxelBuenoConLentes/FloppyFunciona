# import the necessary packages
from picamera.array import PiRGBArray
from picamera import PiCamera
from openalpr import Alpr
import sys
import cv2
import requests
import time

class Maria:

    def __init__(self):
        self.alpr = Alpr("mx", "/etc/openalpr/openalpr.conf", "/usr/share/openalpr/runtime_data")

        if not self.alpr.is_loaded():
            print("Error loading OpenALPR")
            sys.exit(1)

        self.alpr.set_top_n(3)

    def startWatching(self):
        camera = PiCamera()
    	camera.start_preview()
    	time.sleep(5)
    	rawCapture = PiRGBArray(camera)
        # grab an image from the camera
        rawCapture.truncate(0)
        for filename in camera.capture_continuous("temp.jpg"):
            results = self.alpr.recognize_file("./temp.jpg")
            if len(results['results']) != 0:
                yield results['results']

    def sendRecognizedPlate(self, plate):
        r = requests.post("http://localhost/maria/recognize-plate/?username=BenjaminGuzman&password=MariaUribe&plate={}".format(plate), auth=("BenjaminGuzman", "MariaUribe"))
        print(r.status_code)
