const encryptionKeyword = "enc:";
const messageEnding = ":enc";
const encryptedClassName = " plugin-encrypted-message";
const messageClass = ["im_msg_text", "im-mess--text"];
const html = 1;
const js = 0;
var key = "";

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
	var selection = document.getSelection();
	var message = selection.anchorNode.data;

	var selectionIsEditable = selection.anchorNode.parentNode.isContentEditable;

	if ( selectionIsEditable && ("" != message) )
	{
		selection.anchorNode.data = getEncryptedMessage(message, key, encryptionKeyword);
	}
}

function MessageDecryptor(classList, encryptionKeyword)
{
	const decryptedTagBeginning = "<span class='" + encryptedClassName + "'>";
	const decryptedTagEnding = "</span>";
	//in ms
	var timeout = 50;



	function prepareMessage(message)
	{
		var messageEnd = message.indexOf(messageEnding);

		if (-1 != messageEnd)
		{
			message = message.slice(0, messageEnd);
		}
		return message.replace(encryptionKeyword,"");
	}

	function getRegExp()
	{
		return new RegExp(encryptionKeyword + "(.*)"+ messageEnding, 'g');
	}

	function decryptMessage(string)
	{
		var encryptedString = prepareMessage(string);

		return replaceTags(vernamCipher(encryptedString, key), js);
	}

	// function decryptMessages()
	// {
	// 	var regExp = getRegExp();
	// 	var unmodifiedBody = $("body").html();
	// 	var modifiedBody = unmodifiedBody.replace(regExp, decryptMessage);

	// 	if(modifiedBody == unmodifiedBody)
	// 	{
	// 		return false;
	// 	}
	// 	else
	// 	{
	// 		$("body").html(modifiedBody);
	// 		return true;
	// 	}
	// }

	function decryptMessages()
	{
		var element = document.querySelector("body");
		var node;
		var walk = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);

		while (node = walk.nextNode())
		{
			if(-1 != node.data.indexOf(encryptionKeyword) && -1 != node.data.indexOf(messageEnding))
			{
				//FIXME
				node.parentNode.className += encryptedClassName;
				node.data = decryptMessage(node.data);
			}
		}
	}

	//Initialization

	observeDOM(document.querySelector('body') , decryptMessages);

}

var observeDOM = (function(){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
        eventListenerSupported = window.addEventListener;

    return function(obj, callback){
        if( MutationObserver ){
            // define a new observer
            var obs = new MutationObserver(function(mutations, observer){
                if( mutations[0].addedNodes.length || mutations[0].removedNodes.length )
                    callback();
            });
            // have the observer observe foo for changes in children
            obs.observe( obj, { childList:true, subtree:true });
        }
        else if( eventListenerSupported ){
            obj.addEventListener('DOMNodeInserted', callback, false);
            obj.addEventListener('DOMNodeRemoved', callback, false);
        }
    }
})();

$(document).ready (function()
{
	var decryptor = new MessageDecryptor(messageClass, encryptionKeyword);
})


