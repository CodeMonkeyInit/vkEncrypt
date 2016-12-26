function preparePassword(password)
{
    const offset = 100;
    var alphabet = String.fromCharCode;
    var modifedPassword = "";

    for (var i = 0; i < password.length; i++)
    {
        modifedPassword += alphabet(password.charCodeAt(i) + offset);
    }
    return modifedPassword;
}

function updatePasswords(id, password)
{
    function setCurrent(passwords, id, password)
    {
        var modifedPassword = preparePassword(password);
        
        passwords[id] = modifedPassword;

        chrome.storage.sync.set({
            passwords: passwords
        },  function() {
                var status = document.getElementById('status');
                status.textContent = 'Изменения сохранены';

                setTimeout(function() {
                      status.textContent = '';
                }, 750);
          }); 
    }

    chrome.storage.sync.get({
        passwords: null,
    },  function(items) {
            if (items.passwords == null)
            {
                items.passwords = {};
            }
            setCurrent(items.passwords, id, password);
        });
}

function save_options(id) {
    
    var password = document.getElementById('password').value;
    //var hashedPassword = SHA256(password);


    if (password != '')
    {

        if ("" == id)
        {
            
          return;
        }
        //TODO get encryption
        updatePasswords(id, password);
    }

}

function restore_options(id) {

    var status = document.getElementById('status');
    if ("" == id)
    {
        
        status.textContent = 'Сначала зайдите в диалог Вконтакте';
        return;
    }

    document.getElementById('password').removeAttribute("disabled");
    document.getElementById('save').removeAttribute("disabled");

    chrome.storage.sync.get({
        passwords: null,
    },  function(items) {
            if (items.passwords != null)
            {
                if (typeof items.passwords[id] !== "undefined")
                {
                    document.getElementById('password').value = items.passwords[id];
                }
                
                console.log(items.passwords);
            }
            
        });
    status.textContent = "Диалога с  id:" + id + ".";

}
document.addEventListener('DOMContentLoaded', function ()
{
    getID(restore_options);
});
document.getElementById('save').addEventListener('click', function ()
{
    getID(save_options);
});