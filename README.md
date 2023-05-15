# ServiceNow Macro

This is a Webex Device Macro which enables you to create a ServiceNow Incident straight from the devices UI. 

<p align="center">
  <img src="https://user-images.githubusercontent.com/21026209/195579803-814adc03-094d-45bc-80b7-0137daf44eb3.gif" />
</p>

## How it works

ServiceNow provides a REST API to create new incidents and we can make that API request from the Webex Deivce. This Macro can be configured with up to 5 different preconfigured issue topics with control of the fields the ServiceNow incident will be set to, eg. Priority and Assignment Groups

## Requirements

1. RoomOS/CE 9.6.x or above Webex Device.
2. Web admin access to the device to uplaod the macro.
3. Admin crentials for a ServiceNow instance.
4. Network connectivity for your Webex Device to make HTTP POSTs directly with the ServiceNow APIs.

## Setup

1. Download the ``servicenow-macro.js`` file and upload it to your Webex Room devices Macro editor via the web interface.
2. Configure the Macro by changing the initial values, there are comments explaining each one.
3. Enable the Macro on the editor.


## Validation

This Macro was developed and tested on a Webex Codec Pro with Webex Room Navigator and a Touch 10 to verify the exist PWA mode feature. Other combinations of devices e.g. Desk/Board devices paired with a Navigator should also work but haven't been tested at this time.


## Demo

*For more demos & PoCs like this, check out our [Webex Labs site](https://collabtoolbox.cisco.com/webex-labs).


## License

All contents are licensed under the MIT license. Please see [license](LICENSE) for details.


## Disclaimer

Everything included is for demo and Proof of Concept purposes only. Use of the site is solely at your own risk. This site may contain links to third party content, which we do not warrant, endorse, or assume liability for. These demos are for Cisco Webex usecases, but are not Official Cisco Webex Branded demos.


## Questions
Please contact the WXSD team at [wxsd@external.cisco.com](mailto:wxsd@external.cisco.com?subject=servicenow-macro) for questions. Or, if you're a Cisco internal employee, reach out to us on the Webex App via our bot (globalexpert@webex.bot). In the "Engagement Type" field, choose the "API/SDK Proof of Concept Integration Development" option to make sure you reach our team. 
