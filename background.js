function updateKey()
{
	getID(getKey);

}

chrome.commands.onCommand.addListener(function(command) 
{
    if("encrypt" == command)
    {
    	if ("" == key)
    	{
    		alert("Сначала введите ключ!");
    	}
    	chrome.tabs.executeScript({
    		code: 'encryptMessage("' + key + '");'
    	});
    }
});


setInterval(updateKey, 50);

