# ServiceNow Macro

This is a Webex Device Macro which enables you to create a ServiceNow Incident straight from the devices UI. 

<p align="center">
  <img src="https://user-images.githubusercontent.com/21026209/195474727-f425ba79-88d3-4720-a003-c62d15faa48e.gif" />
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

## Support

Please reach out to the WXSD team at [wxsd@external.cisco.com](mailto:wxsd@external.cisco.com?subject=servicenow-macro).
