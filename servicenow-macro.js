/********************************************************
Copyright (c) 2022 Cisco and/or its affiliates.
This software is licensed to you under the terms of the Cisco Sample
Code License, Version 1.1 (the "License"). You may obtain a copy of the
License at
               https://developer.cisco.com/docs/licenses
All use of the material herein must be in accordance with the terms of
the License. All rights not expressly granted by the License are
reserved. Unless required by applicable law or agreed to separately in
writing, software distributed under the License is distributed on an "AS
IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
or implied.
*********************************************************
 * 
 * Macro Author:      	William Mills
 *                    	Technical Solutions Specialist 
 *                    	wimills@cisco.com
 *                    	Cisco Systems
 * 
 * Version: 1-0-0
 * Released: 10/12/22
 * 
 * This is a Webex Device Macro which enables you to create a ServiceNow 
 * Incident straight from the devices UI.
 * 
 * Full Readme and source code availabel on Github:
 * https://github.com/wxsd-sales/servicenow-macro
 * 
 * This Macro is based off similar work from the following sources:
 * https://github.com/CiscoDevNet/roomdevices-macros-samples/tree/master/HTTP%20Post%20-%20Report%20Issue
 * https://github.com/cisco-ce/roomhub
 ********************************************************/
import xapi from 'xapi';

/*********************************************************
 * Configure the settings below
**********************************************************/

// Configured your ServiceNow settings:
const servicenow = {
  instance: 'domainname',    // Your ServiceNow instance
  username: 'admin',        // ServiceNow Admin username
  pass: '1234567890'      // ServiceNow Admin password
};

// Specify the Initial issue topics (up to 5)
const issueOptions = {
  Title: 'Report issue in this room:',
  Text: 'What type of issue?',  
  'Option.1': 'Room System Issue',
  "Option.2": 'Facility issue',
  'Option.3': 'Request Security',
  'Option.4': 'Catering Request',
  'Option.5': 'Share Feedback',
  FeedbackId: 'issue-category',
  Duration: 20,
};

// Configure the 2nd and 3rd input prompt text
const promptText = {
  second: {
    Title: 'Report issue step 2:',
    Text: 'Enter a short description of the issue'
  },
  third: {
    Title: 'Report issue step 3:',
    Text: 'Please enter your name'
  }
}

/*********************************************************
 * Main function to setup and add event listeners
**********************************************************/

// Macros variables
let serialNumber;
let displayName;
let issueCategory;
let issueComment;
let software;
let person;

// Create Basic Auth Base64 token
function basicAuth(user, password) {
    return "Basic " + btoa(user + ":" + password);
}

// Prepares the incident report
function createReport() {

  // This is the ServiceNow incident payload
  const incident = {
    assignment_group: 'MeetingRoom',
    short_description: issueCategory,
    urgency: '2',
    impact: '2',
    description: `User Comment: ${issueComment}
      User Name: ${person}
      Room Name: ${displayName}
      Software: ${software}
      Device Serial: ${serialNumber}`
  };
  
  // Send the incident payload to ServiceNow
  const url = `https://${servicenow.instance}.service-now.com/api/now/table/incident`;
  const body = JSON.stringify(incident);
  const Header = ['Content-Type: application/json',
  'Authorization: ' + basicAuth(servicenow.username, servicenow.pass)];
  console.log(body);
  
  xapi.Command.HttpClient.Post({ Url: url, Header, AllowInsecureHTTPS: 'True', ResultBody: 'PlainText' }, body)
  .then(r => {
    if(r.StatusCode > 200 && r.StatusCode < 300){
      const incidentNo = JSON.parse(r.Body).result.number;
      alert('Success', 'ServiceNow Incident created: ' + incidentNo);
    } else {
      alert('Error', 'Status code: ' + r.StatusCode);
    }
  })
  .catch(() => alert('Error', 'Unable to create incident', 10));
}


function alert(title, text, duration) {
  xapi.Command.UserInterface.Message.Alert.Display({ Title: title, Text: text, Duration: duration });
  console.log(`${title}: ${text}`)
}

function onTextInput(e) {
  if (e.FeedbackId === 'issue-comment') {
    issueComment = e.Text;
    setTimeout(() => {
      xapi.Command.UserInterface.Message.TextInput.Display({
        Title: promptText.third.Title,
        Text: promptText.third.Text,
        FeedbackId: 'issue-name',
        InputText: '',
      });
    }, 600);
  }
  else if (e.FeedbackId === 'issue-name') {
    person = e.Text;
    createReport();
  }
}

function onPromptResponse(e) {
  if (e.FeedbackId !== 'issue-category') return;
  issueCategory = issueOptions['Option.' + e.OptionId];
  xapi.Command.UserInterface.Message.TextInput.Display({
    Title: promptText.second.Title,
    Text: promptText.second.Text,
    InputText: '',
    FeedbackId: 'issue-comment',
    Duration: 600,
  });
}

function onPanelClicked(e) {
  if (e.PanelId === 'report-issue') {
    xapi.Command.UserInterface.Message.Prompt.Display(issueOptions)
  }
}

// Create the Button
function createPanel() {
  const panel = `
  <Extensions>
    <Version>1.9</Version>
    <Panel>
      <PanelId>report-issue</PanelId>
      <Origin>local</Origin>
      <Type>Statusbar</Type>
      <Location>HomeScreenAndCallControls</Location>
      <Icon>Info</Icon>
      <Color>#FC5143</Color>
      <Name>Report Issue</Name>
      <ActivityType>Custom</ActivityType>
    </Panel>
  </Extensions>`;
  xapi.Command.UserInterface.Extensions.Panel.Save(
    { PanelId: 'report-issue' },
    panel
  )
}

// Initialize macro
async function init() {
  await xapi.Config.HttpClient.Mode.set('On');
  await xapi.Config.HttpClient.AllowInsecureHTTPS.set('True');
  serialNumber = await xapi.Status.SystemUnit.Hardware.Module.SerialNumber.get();
  displayName = await xapi.Status.UserInterface.ContactInfo.Name.get();
  software = await xapi.Status.SystemUnit.Software.DisplayName.get();
  xapi.Event.UserInterface.Extensions.Panel.Clicked.on(onPanelClicked);
  xapi.Event.UserInterface.Message.Prompt.Response.on(onPromptResponse);
  xapi.Event.UserInterface.Message.TextInput.Response.on(onTextInput);
  createPanel();
}

init();
