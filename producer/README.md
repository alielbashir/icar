# Producer
A RabbitMQ Publisher that mocks real-time telemetry data from the taxiMovementConcatenated [dataset](https://www.kaggle.com/henrikengdahl/taximovementconcatenated)

## Usage
1. Install the library
```
git clone https://github.com/alielbashir/producer
```

2. Run main.go with the dataset and (optionally) sampling frequency
```
go run main.go -f 0.5 truncatedAllCars.csv 
```

