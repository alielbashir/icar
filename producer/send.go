package main

import (
	"encoding/csv"
	"encoding/json"
	"flag"
	"fmt"
	"io"
	"log"
	"os"
	"strconv"
	"time"

	"github.com/streadway/amqp"
)

// struct representing car location
type CarLocation struct {
	Time int64   `json:"time"`
	Id   uint16  `json:"id"`
	Lat  float64 `json:"lat"`
	Lon  float64 `json:"lon"`
}

// function to read a csv record into a CarLocation object
func (c *CarLocation) fromRecord(record []string) {
	c.Time = time.Now().Unix()
	c.Lat, _ = strconv.ParseFloat(record[1], 64)
	c.Lon, _ = strconv.ParseFloat(record[2], 64)
	tmp, _ := strconv.ParseUint(record[3], 10, 16)
	c.Id = uint16(tmp)
}

func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}

func pushCarLocation(channel *amqp.Channel, c *CarLocation) {
	payload, err := json.Marshal(c)
	failOnError(err, "Couldn't marshal json")
	err = channel.Publish(
		"cars", // exchange
		"",     // routing key
		false,  // mandatory
		false,  // immediate
		amqp.Publishing{
			ContentType: "text/plain",
			Body:        payload,
		})
	failOnError(err, "Couldn't send message")

}

func main() {

	flag.Usage = func() {
		fmt.Printf("Usage: %s [options] <csvFile>\nOptions:\n", os.Args[0])
		flag.PrintDefaults()
	}
	// read input
	speed := flag.Float64("f", 1.0, "data sampling frequency in Hz")

	// parse input flags
	flag.Parse()

	fmt.Printf("f = %f samples per minute\n", *speed)
	// open csv file

	var path string
	switch len(os.Args) {
	case 2:
		path = os.Args[1]
	case 4:
		path = os.Args[3]
	default:
		flag.Usage()
		os.Exit(1)
	}

	// connect to server
	conn, err := amqp.Dial("amqp://localhost:5672/")
	failOnError(err, "Failed to connect to RabbitMQ")
	defer conn.Close()

	// connect to channel
	ch, err := conn.Channel()
	failOnError(err, "Failed to open a channel")
	defer ch.Close()

	// declare exchange for messages
	err = ch.ExchangeDeclare(
		"cars",   // name
		"fanout", // type
		true,     // durable
		false,    // auto-deleted
		false,    // internal
		false,    // no-wait
		nil,      // arguments
	)
	failOnError(err, "Failed to declare an exchange")

	file, err := os.Open(path)

	if err != nil {
		log.Fatal(err)
	}

	// start timer for 60 seconds divided by speed
	r := csv.NewReader(file)
	r.FieldsPerRecord = 4
	ticker := time.NewTicker(time.Duration(1000000000 / *speed) * time.Nanosecond)

	carLocation := CarLocation{}
	var lastTime string

	// read until time is different and send to RabbitMQ server while reading
	for {
		record, err := r.Read()
		if err == io.EOF {
			break
		}

		if err != nil {
			log.Fatal(err)
		}

		// wait for timer, then repeat
		if lastTime != record[0] {
			<-ticker.C
			lastTime = record[0]
		}
		carLocation.fromRecord(record)
		// send record to queue
		pushCarLocation(ch, &carLocation)
	}

}
