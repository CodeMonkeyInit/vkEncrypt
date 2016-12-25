function getKey (id) 
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
	            chrome.tabs.executeScript({
	                code: 'key = "' + items.password + '";'
	            });
	  		}
		});
	}
}