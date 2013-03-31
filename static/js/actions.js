function show(ids)
{
    for (var i = 0; i < makes.length; i++)
    {
        var id = ids[i];
        $('#' + id).removeClass('hidden');
    }
}

function hide(ids)
{
    for (var i = 0; i < makes.length; i++)
    {
        var id = ids[i];
        $('#' + id).addClass('hidden');
    }
}

function load(ids, url)
{
    $.getJSON("url",{ ajax: 'true' }, function(response)
    {
        data = response["data"];
        for (var i = 0; i < data.length; i++)
        {
            var id = ids[i];
            $('#' + id).innerHTML(data[i]);
        }
    });
}