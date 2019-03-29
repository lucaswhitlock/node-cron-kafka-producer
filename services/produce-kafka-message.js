import kafka from "kafka-node";

const client = new kafka.KafkaClient(process.env.KAFKA_CLIENT);
const producer = new kafka.Producer(client);

var isProducerReady = false;

producer.on("ready", () => {
    isProducerReady = true;
    console.log("Kafka producer is ready.");
});

producer.on("error", (error) => {
    isProducerReady = false;
    console.log("Error while producing Kafka message: " + error);
})

const execute = async () => {
    if (isProducerReady) {
        console.log("Generating payload...");
        let payload = [{
            topic: process.env.KAFKA_TOPIC,
            messages: new kafka.KeyedMessage("1", "Teste"),
            partition: 0
        }];
        console.log(`Payload generated successfully: ${JSON.stringify(payload)}`);
        producer.send(payload, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Payload sent to Kafka topic ${process.env.KAFKA_TOPIC} successfully.`);
            }
        });
    } else {
        console.log("Kafka producer not ready, yet failling to produce message to broker.");
    }
};

export {
    execute
};