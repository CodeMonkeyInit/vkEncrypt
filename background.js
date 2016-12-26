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
	    	passwords: null
	  	},  
	  	function(items) 
	  	{
	  		if (null != items.passwords[id])
	  		{
	            encryptMessage(items.passwords[id]);
	  		}
	  		else
	  		{
	  			alert("Сначала введите ключ!");
	  		}
		});
	}
}

function encryptMessage(key)
{
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

//контекстное меню для шифровки сообщения
chrome.contextMenus.create({
	"title" : "Зашифровать",
	"type" : "normal",
	"contexts" : ["all"],
	"onclick" : getEncryptClickHandler()
});

//todo  обновлять ключ только при смене страницы/вкладки
chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tab){
	updateKey();
});

