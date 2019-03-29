import cron from "cron";
import {
    execute
} from "../services/produce-kafka-message";

var scheduler = new cron.CronJob({
    cronTime: "*/5 * * * * *",
    onTick: execute,
    start: true,
    runOnInit: true
});

export default {
    start(req, res) {
        if (scheduler.running) {
            res.status(403).send({
                message: 'O serviço já está em funcionamento!'
            });
        } else {
            console.log('Servico iniciado por usuario');
            scheduler.start();
            if (scheduler.running) {
                res.status(200).send({
                    message: 'Serviço iniciado com sucesso.'
                });
            }
        }
    },
    stop(req, res) {
        if (!scheduler.running) {
            res.status(403).send({
                message: 'O serviço já está parado!'
            });
        } else {
            console.log('Servico parado por usuario.');
            scheduler.stop();
            if (!scheduler.running) {
                res.status(200).send({
                    message: 'Serviço parado com sucesso.'
                });
            }
        }
    },
    refresh(req, res) {
        res.status(403).send({
            message: {
                lastExecution: scheduler.lastDate(),
                nextExecution: scheduler.nextDates()
            }
        });
    }
}