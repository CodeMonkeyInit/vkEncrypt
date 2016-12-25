var encryptButton = document.getElementById("button-encrypt");
var decryptButton = document.getElementById("button-decrypt");

encryptButton.onclick = function()
{
	encryptTest('im_msg_text', key, encryptionKeyword)
}

decryptButton.onclick = function () 
{
	decryptAllMessages('im_msg_text', key, encryptionKeyword); 
}