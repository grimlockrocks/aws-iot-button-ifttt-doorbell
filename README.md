# aws-iot-button-ifttt-doorbell
Use AWS IoT button and IFTTT to build a doorbell. 

The idea is to use the button as a doorbell, mostly for package delivery notifications: the delivery guy can just press the button, and you will get a SMS or push notification on your smartphone.

**Step 1:** Follow the [instructions](https://aws.amazon.com/iotbutton/) to register the button with AWS IoT.

**Step 2:** Use [IFTTT Maker Webhooks](https://ifttt.com/maker_webhooks) to create a new Applet. You will need to register with IFTTT and then generate a key under [Settings](https://ifttt.com/services/maker_webhooks/settings) (The key is the last part of URL).

The Applet is defined as following:
* Receive a web request, event name: AWS_IoT_Button_SINGLE
* Send a notification from the IFTTT app, notification: Ding Dong!

**Step 3:** Create a Lambda function with trigger being the registered IoT button.

**Step 4:** Test! Press the button and you should receive a push notification on your smartphone. 

Lastly, it is worth noting that the AWS IoT button has its major drawbacks:
1. The battery only lasts for 1000 clicks - that's $0.02 per click.
2. It takes about 10 seconds for the button to send signal, so it may not be a good idea to use it for doorbell after all.

