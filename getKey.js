function getKey (id) 
{
	if ("" != id)
	{
		chrome.storage.sync.get(
		{
	    	passwords: null
	  	},  
	  	function(items) 
	  	{
	  		if (null != items.passwords)
	  		{
	  			if (typeof items.passwords[id] !== "undefined")
                {
		            chrome.tabs.executeScript({
		                code: 'key = "' + items.passwords[id] + '";alert(key);'
		            });
		        }
	  		}
		});
	}
}