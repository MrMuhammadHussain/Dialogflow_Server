import { WebhookClient } from 'dialogflow-fulfillment';
import ChatGPT from "chatgpt-official";
import express, { json, urlencoded } from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(json());

app.use(urlencoded({ extended: true }));


app.post('/chat', async (req, res) => {
    const body = req.body
    const intentName = body.queryResult.intent.displayName
    const params = body.queryResult.parameters
    console.log(intentName);
    console.log(body.responseId);

    switch (intentName) {
        case 'OrderPizza':

            let responseText = `Your${params.qty} ${params.size} ${params.flavor} ${params.item}Ready`
            console.log(params);
            return res.send({
                "fulfillmentMessages": [
                    {
                        "text": {
                            "text": [
                                responseText
                            ]
                        }
                    }
                ]
            })
        default:
            break;
    }



});

app.listen(process.env.PORT || 8080, function () {
    console.info(`Application launched on port ${process.env.PORT || 8080}`);
});

app.get('/', function (req, res) {
    return res.status(200).send('Application launched!');
});
