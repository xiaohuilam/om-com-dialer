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
'use strict';

var number;
var code;
var gvoice = 'false';
var gnumber;
var gcode;

function saveProperties() {
	if(localStorage) {
		localStorage.setItem('number', number);
		localStorage.setItem('code',code);
		localStorage.setItem('gvoice',gvoice);
		localStorage.setItem('gnumber',gnumber);
		localStorage.setItem('gcode',gcode);
	}
}


function updateCallButton() {
	var fullnumber = 'tel:';
	
	if(gvoice === 'true') {
		fullnumber = fullnumber + gnumber + ',' + gcode + ',*,2,';
	}
	
	fullnumber = fullnumber + number;
	
	if(gvoice === 'true') {
		fullnumber = fullnumber + '#';
	}
	
	if(code !== null && code.length > 0) {
		fullnumber = fullnumber + ',,,' + code + '#';
	}
	
	$('#callbutton').attr('href', fullnumber);
}

/**
 * Update Number will read the fields out of the Google Plus Settings and
 * on the page and construct the full number to call.  Then it will update
 * the link in the number itself.
 */
function updatenumber() {
    var tempNumber = $('#number').val();
    var tempCode = $('#code').val();
    var tempGNumber = $('#gnumber').val();
    var tempGCode = $('#gcode').val();
    
    // Set that there is no dirty variables.
    // At the end if something has become dirty the saved values
    // must be updated.
    var dirty = false;
    if(tempNumber !== number) {
        tempNumber = tempNumber.replace(/[^0-9]/g, '');
        number = tempNumber;
        $('#number').val(number);
        updateCallButton();
        dirty = true;
    }
    if(tempCode !== code) {
        tempCode = tempCode.replace(/[^0-9]/g, '');
        code = tempCode;
        $('#code').val(code);
        updateCallButton();
        dirty = true;
    }
    if(tempGNumber !== gnumber) {
        tempGNumber = tempGNumber.replace(/[^0-9]/g, '');
        gnumber = tempGNumber;
        $('#gnumber').val(gnumber);
        updateCallButton();
        dirty = true;
    }
    if(tempGCode !== gcode) {
        tempGCode = tempGCode.replace(/[^0-9]/g, '');
        gcode = tempGCode;
        $('#gcode').val(gcode);
        updateCallButton();
        dirty = true;
    }
    
    if(dirty === true) {
		saveProperties();
    }
}

function resetForm() {
	$('#number').val('');
	$('#code').val('');
	$('#number').focus();
	updatenumber();
}

function toggleGvoice() {
	var tempGvoiceToggle = document.getElementById('gvoice').value;

	if('false' === tempGvoiceToggle) {
		gvoice = 'true';
		$('#gvoice').val('true');

		$('#gvoicebutton').empty();
		$('#gvoicebutton')
		.append(
			$('<b></b>')
				.html('GVoice'))
				.append(
					$('<span></span>')
					.addClass('subtitle')
					.append(
						$('<i></i>')
							.addClass('fa')
							.addClass('fa-check-square-o')
					)
				);
		$('#gvoicebutton').removeClass('unchecked');
		updateCallButton();
		saveProperties();
	} else {
		gvoice = 'false';
		$('#gvoice').val('false');
		$('#gvoicebutton').empty();
		$('#gvoicebutton')
	        .append(
	            $('<b></b>').
	                html('GVoice'))
		        .append(
		            $('<span></span>')
		                .addClass('subtitle')
		                .append(
		                    $('<i></i>')
		                        .addClass('fa')
		                        .addClass('fa-square-o')
		                )
				);

		$('#gvoicebutton').addClass('unchecked');
		updateCallButton();
	    saveProperties();
	}
}

function doEdit() {
    $('#mainpage').slideUp('slow'); // remove
    $('#settingsScreen').slideDown('slow'); // show
}

function doBack() {
    $('#settingsScreen').slideUp('slow'); // remove
    $('#mainpage').slideDown('slow'); // show
}

function loadProperties() {
	if(localStorage) {
		number = localStorage.getItem('number');
		code = localStorage.getItem('code');
		gvoice = localStorage.getItem('gvoice');
		gnumber = localStorage.getItem('gnumber');
		gcode = localStorage.getItem('gcode');
		
		$('#number').val(number);
		$('#code').val(code);
		$('#gvoice').val(gvoice);
		$('#gnumber').val(gnumber);
		$('#gcode').val(gcode);
		
		if('true' === gvoice) {
			// $('#gvoicebutton').html('&#x2611; GVoice');
			$('#gvoicebutton').removeClass('unchecked');
		} else {
			// $('#gvoicebutton').html('&#x2610; GVoice');
			$('#gvoicebutton').addClass('unchecked');
		}
		
		updateCallButton();
	}
}

/*
 * The main startup function used to bind javascript functions to all the
 * required elements as well as to load properties and complete setup.
 */
$( document ).ready(function() {
    // Setup all the handlers in the main page
    $('#settingsbutton').click(doEdit);

    $('#number').blur(updatenumber);
    $('#code').blur(updatenumber);
    $('#gvoicebutton').click(toggleGvoice);
    $('#callbutton').click(updatenumber);
    $('#resetbutton').click(resetForm);

    $('#settingsdone').click(doBack);
    $('#gnumber').blur(updatenumber);
    $('#gcode').blur(updatenumber);

    window.addEventListener('shake', resetForm, false);

    loadProperties();
    updatenumber();
    window.scrollTo(0, 1);
});
