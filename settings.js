function save_options(id) {
    
    var password = document.getElementById('password').value;
    var hashedPassword = SHA256(password);


    if (password != '')
    {

    if ("" == id)
    {
        
      return;
    }

    chrome.storage.sync.set({
        password: hashedPassword
    },  function() {
            var status = document.getElementById('status');
            status.textContent = 'Изменения сохранены';

            setTimeout(function() {
                  status.textContent = '';
            }, 750);
      });
    }

}

function restore_options(id) {

    console.log(id);

    if ("" == id)
    {
        var status = document.getElementById('status');
        status.textContent = 'Сначала зайдите в диалог Вконтакте';
        return;
    }
    chrome.storage.sync.get({
        password: null,
    },  function(items) {
            if (items.password != null)
            {
                document.getElementById('password').value = items.password;
            }
            
        });
}
document.addEventListener('DOMContentLoaded', function ()
{
    getID(restore_options);
});
document.getElementById('save').addEventListener('click', function ()
{
    getID(save_options);
});