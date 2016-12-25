function getID(callback)
{
	
	function parseURL(url)
	{
		var id = "";
		var idStart = url.indexOf("sel=");

		if ( ( -1 != url.indexOf("vk.com") ) && (-1 != idStart) )
		{
			id = url.slice(idStart, url.length);
		}
		callback(id);
	}


	chrome.tabs.query({'currentWindow': true, 'url': "*://vk.com/*"}, function (tabs) {
		if (tabs.length > 0)
		{
			url = tabs[0].url;
     		parseURL(url);
		}

    	
	});
}

