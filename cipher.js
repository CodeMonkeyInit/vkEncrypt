const encryptionKeyword = "enc:";
const messageEnding = ":enc";
const enctyptedClassName = " plugin-encrypted-message";
const inputMessageClass = "im_editable";
const messageClass = ["im_msg_text", "im-mess--text"];
const keyUndefined = "Ключ не задан";
const html = 1;
const js = 0;
var key;

function replaceTags(message, type)
{
	if (html == type)
	{
		return message.replace("<br>", "\n");	
	}
	else if (js == type)
	{
		return message.replace("\n", "<br>");
	}
}


function vernamCipher(string, key)
{
	var alphabet = String.fromCharCode;

	var keyLength = key.length;
	var encrypted = "";

	for (var i = 0; i < string.length; i++)
	{
		encrypted += alphabet( key.charCodeAt(i % keyLength) ^ string.charCodeAt(i) );	
	}

	return encrypted;
}

function getEncryptedMessage(message, key, encryptionKeyword)
{
	return encryptionKeyword + vernamCipher(message, key) + messageEnding;
}

function encryptMessage(key) 
{
	var unEncryptedMessage = document.getElementsByClassName(inputMessageClass)[0];

	if ( ("" != unEncryptedMessage.innerHTML) && (-1 == unEncryptedMessage.innerHTML.indexOf(encryptionKeyword) ) )
	{
		unEncryptedMessage.innerHTML = getEncryptedMessage(unEncryptedMessage.innerHTML, key, encryptionKeyword);
	}
}

function decryptAllMessages(classList, key = "", encryptionKeyword)
{
	function prepareMessage(message)
	{
		var messageEnd = message.indexOf(messageEnding);

		if (-1 != messageEnd)
		{
			message = message.slice(0, messageEnd);
		}
		return message.replace(encryptionKeyword,"");

	}

	function decryptMessages(messages)
	{
		for (var i = 0; i < messages.length; i++)
		{
			var message = messages[i].innerHTML;

			if ( -1 != message.indexOf(encryptionKeyword) )
			{
				messages[i].className += enctyptedClassName;
				message = prepareMessage(message);
				
				if ("" == key)
				{
					messages[i].innerHTML = keyUndefined;
				}
				else
				{
					messages[i].innerHTML = replaceTags( vernamCipher(message, key), js );
				}
				
			}
		}
	}

	for (var i = 0; i < classList.length; i++)
	{
		var messages = document.getElementsByClassName(classList[i]);

		decryptMessages(messages);
	}
}
setInterval(decryptAllMessages, 500, messageClass, key, encryptionKeyword);
