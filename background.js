function updateKey()
{
	getID(getKey);
}

function getKeyForPlugin(id)
{
	if ("" != id)
	{
		chrome.storage.sync.get(
		{
	    	password: null
	  	},  
	  	function(items) 
	  	{
	  		if (null != items.password)
	  		{
	            encryptMessage(items.password);
	  		}
		});
	}
}

function encryptMessage(key)
{
	if ("" == key)
	{
		alert("Сначала введите ключ!");
	}

	chrome.tabs.executeScript({
		code: 'encryptMessage("' + key + '");'
	});
}

chrome.commands.onCommand.addListener(function(command) 
{
	if ("encrypt" == command)
	{
		getID(getKeyForPlugin);
	}
});

function getEncryptClickHandler() {
	return function(info, tab) {
		getID(getKeyForPlugin);
  	};
};

/**
 * Create a context menu which will only show up for images.
 */
chrome.contextMenus.create({
  "title" : "Зашифровать",
  "type" : "normal",
  "contexts" : ["all"],
  "onclick" : getEncryptClickHandler()
});

setInterval(updateKey, 50);

