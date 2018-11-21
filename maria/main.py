from Maria import Maria

def main():
    maria = Maria()
    # esperar a que se encuentre una placa
    for plate in maria.startWatching():
        if plate[0]["confidence"] > 85:
            # enviar al servidor la placa reconocida
	    	for x in xrange(1,5):
	    		datos[i-1] = plate[0]["plate"]
	    print(plate[0]["plate"])
            ##maria.sendRecognizedPlate(plate[0]["plate"])
    print("Solo aparecera una vez" + datos[2])
    maria.sendRecognizedPlate(plate[0]["plate"]);
    
if __name__ == '__main__':
    main()
