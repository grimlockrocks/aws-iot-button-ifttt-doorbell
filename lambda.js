/*
 * AWS IoT Button Demo
 * Author: Sheng Bi
 */

const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1'
});
const https = require('https');

const doc = new AWS.DynamoDB.DocumentClient();

const IFTTT_KEY = '<Your_IFTTT_Key>';

/*
 * The following JSON template shows what is sent as the payload:
{
    "serialNumber": "GXXXXXXXXXXXXXXXXX",
    "batteryVoltage": "xxmV",
    "clickType": "SINGLE" | "DOUBLE" | "LONG"
}
 *
 * A "LONG" clickType is sent if the first press lasts longer than 1.5 seconds.
 * "SINGLE" and "DOUBLE" clickType payloads are sent for short clicks.
 *
 * For more documentation, follow the link below.
 * http://docs.aws.amazon.com/iot/latest/developerguide/iot-lambda-rule.html
 */

exports.handler = (event, context, callback) => {
    console.log("Received event: ", event.clickType);

    var now = new Date();
    var ddbRequest = {
        TableName: "iot_button",
        Item: {
            "timestamp": now.toUTCString(),
            "click": event.clickType
        }
    };
    doc.put(ddbRequest, function(e1, d1) {
        if (e1) {
            console.log("Failed to save data to DynamoDB: " + e1, e1.stack);
            context.done();
        } else {
            console.log("Successfully saved data to DynamoDB");
            var url = "https://maker.ifttt.com/trigger/" + "AWS_IoT_Button_" + event.clickType + "/with/key/" + IFTTT_KEY;
            https.get(url, function(res) {
                console.log("Successfully published notification to IFTTT: " + url);
                context.succeed();
            }).on("error", function(e2) {
                console.log("Failed to publish notification to IFTTT: " + e2, e2.stack);
                context.done();
            });
        }
    });
};
