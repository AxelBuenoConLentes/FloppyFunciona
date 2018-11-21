import RPi.GPIO as GPIO
from time import sleep

GPIO.setmode(GPIO.BOARD)
GPIO.setup(7, GPIO.OUT)
pwm = GPIO.PWM(7, 50)
pwm.start(7.5)
try:
	while True:
		pwm.ChangeDutyCycle(7.5)
		sleep(1)
		pwm.ChangeDutyCycle(12.5)
		sleep(1)
		pwm.ChangeDutyCycle(2.5)
		sleep(1)
except KeyboardInterrupt:
	pwm.stop()
	GPIO.cleanup()
#fin de esta madrola