/*
Om-Com Dialer HTML5 WebApp to easily construct a dialing number and passcode
on a phone.
Copyright (C) 2012 Jordan Reed

Conference Dialer is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Conference Dialer is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Conference Dialer.  If not, see <http://www.gnu.org/licenses/>.
*/
var number;
var code;
var gvoice = "false";
var gnumber;
var gcode;

function startup() {
  loadProperties();
  window.scrollTo(0, 1);

  if(!window.navigator.standalone) {
    oldClass = document.getElementById("mainscreen").getAttribute("class");
    newClass = oldClass.replace(" padTop", "");
    document.getElementById("mainscreen").setAttribute("class", newClass);  
    oldClass = document.getElementById("settingsScreen").getAttribute("class");
    newClass = oldClass.replace(" padTop", "");
    document.getElementById("settingsScreen").setAttribute("class", newClass);  
  }
}

function updatenumber() {
  var tempNumber = document.getElementById("number").value;
  var tempCode = document.getElementById("code").value;
  var tempGNumber = document.getElementById("gnumber").value;
  var tempGCode = document.getElementById("gcode").value;
  
  
  if(tempNumber != number) {
    tempNumber = tempNumber.replace(/[^0-9]/g, '');
    number = tempNumber;
    document.getElementById("number").value = number;
    updateCallButton();
    saveProperties();
  }
  if(tempCode != code) {
    tempCode = tempCode.replace(/[^0-9]/g, '');
    code = tempCode;
    document.getElementById("code").value = code;
    updateCallButton();
    saveProperties();
  }
  if(tempGNumber != gnumber) {
    tempGNumber = tempGNumber.replace(/[^0-9]/g, '');
    gnumber = tempGNumber;
    document.getElementById("gnumber").value = gnumber;
    updateCallButton();
    saveProperties();
  }
  if(tempGCode != gcode) {
    tempGCode = tempGCode.replace(/[^0-9]/g, '');
    gcode = tempGCode;
    document.getElementById("gcode").value = gcode;
    updateCallButton();
    saveProperties();
  }
}

function updateCallButton() {
  var callform = document.getElementById("callbutton");
  var fullnumber = "tel:";

  if(gvoice == "true") {
    fullnumber = fullnumber + gnumber + "," + gcode + ",2,";
  }
  
  fullnumber = fullnumber + number;

  if(gvoice == "true") {
    fullnumber = fullnumber + "#";
  }
    
  if(code.length > 0) {
   fullnumber = fullnumber + ",,," + code + "#";
  }
  
  callform.href = fullnumber;
}

function toggleGvoice() {
  var tempGvoiceToggle = document.getElementById("gvoice").value;

  if("false" == tempGvoiceToggle) {
    document.getElementById("gvoice").value = "true";
    document.getElementById("gvoicebutton").innerHTML = "&#x2611; GVoice";
    gvoice = "true";
    var oldClass = document.getElementById("gvoicebutton").getAttribute("class");
    var newClass = oldClass.replace("unchecked ", "");
    document.getElementById("gvoicebutton").setAttribute("class", newClass);
    updateCallButton();
    saveProperties();
  } else {
    document.getElementById("gvoice").value = "false";
    document.getElementById("gvoicebutton").innerHTML = "&#x2610; GVoice";
    gvoice = "false";
    var oldClass = document.getElementById("gvoicebutton").getAttribute("class");
    var newClass = oldClass.replace("unchecked ", "");
    newClass = "unchecked " + newClass;
    document.getElementById("gvoicebutton").setAttribute("class", newClass);
    updateCallButton();
    saveProperties();
  }
}

function doEdit() {
  var oldClass = document.getElementById("mainscreen").getAttribute("class");
  var newClass = oldClass.replace("flipped ", "");
  newClass = "flipped " + newClass;
  document.getElementById("mainscreen").setAttribute("class", newClass);

  oldClass = document.getElementById("settingsScreen").getAttribute("class");
  newClass = oldClass.replace("flipped ", "");
  document.getElementById("settingsScreen").setAttribute("class", newClass);
}

function doBack() {
  var oldClass = document.getElementById("settingsScreen").getAttribute("class");
  var newClass = oldClass.replace("flipped ", "");
  newClass = "flipped " + newClass;
  document.getElementById("settingsScreen").setAttribute("class", newClass);

  oldClass = document.getElementById("mainscreen").getAttribute("class");
  newClass = oldClass.replace("flipped ", "");
  document.getElementById("mainscreen").setAttribute("class", newClass);
}

function saveProperties() {
  if(localStorage) {
    localStorage.setItem("number", number);
    localStorage.setItem("code",code);
    localStorage.setItem("gvoice",gvoice);
    localStorage.setItem("gnumber",gnumber);
    localStorage.setItem("gcode",gcode);
  }
}

function loadProperties() {
  if(localStorage) {
    number = localStorage.getItem("number");
    code = localStorage.getItem("code");
    gvoice = localStorage.getItem("gvoice");
    gnumber = localStorage.getItem("gnumber");
    gcode = localStorage.getItem("gcode");
    
    document.getElementById("number").value = number;
    document.getElementById("code").value = code;
    document.getElementById("gvoice").value = gvoice;
    document.getElementById("gnumber").value = gnumber;
    document.getElementById("gcode").value = gcode;
    if("true" == gvoice) {
      document.getElementById("gvoicebutton").innerHTML = "&#x2611; GVoice";
      var oldClass = document.getElementById("gvoicebutton").getAttribute("class");
      var newClass = oldClass.replace("unchecked ", "");
      document.getElementById("gvoicebutton").setAttribute("class", newClass);
    } else {
      document.getElementById("gvoicebutton").innerHTML = "&#x2610; GVoice";
      var oldClass = document.getElementById("gvoicebutton").getAttribute("class");
      var newClass = oldClass.replace("unchecked ", "");
      newClass = "unchecked " + newClass;
      document.getElementById("gvoicebutton").setAttribute("class", newClass);
    }

    updateCallButton();
  }
}