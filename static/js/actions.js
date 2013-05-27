function show(ids)
{
    console.log('show(' + ids + ')');
    for (var i = 0; i < ids.length; i++)
    {
        var id = ids[i];

        $('#' + id).removeClass('hidden');
    }
}

function hide(ids)
{
    for (var i = 0; i < ids.length; i++)
    {
        var id = ids[i];
        $('#' + id).addClass('hidden');
    }
}

function enable(id, enable)
{
    console.log('enable() here - id: ' + id + ', enable: ' + enable);
    if (enable)
    {
        $('#' + id).removeAttr('disabled')
    }
    else
    {
        $('#' + id).attr('disabled', 'disabled');
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

function displayDriversTable(count)
{
    var show_ids = [];
    var hide_ids = [];
    for (var i = 1; i <= 9; i++)
    {
        var curr_id = "driver_table_" + i;
        if (i <= count)
        {
            show_ids.push(curr_id);
        }
        else
        {
            hide_ids.push(curr_id);
        }
    }

    show(show_ids);
    hide(hide_ids);

    console.log("show_ids:" + show_ids);
    console.log("hide_ids:" + hide_ids);
}
