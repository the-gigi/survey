
function chkbox(page,question) {
    var questname = $(question).attr('name');
    $('#form'+page+' :checkbox').each(function() {
        var thisname = $(this).attr('name');
        if ((thisname.slice(0,4) == questname.slice(0,4)) && (thisname != questname)) {
            if ($(question).attr('checked') == 'checked') {
                $(this).attr('disabled','disabled');
            } else {
                $(this).removeAttr('disabled');
            }
        }
    });
}

function chkboxlong(page,question) {
    var questname = $(question).attr('name');
    $('#form'+page+' :checkbox').each(function() {
        var thisname = $(this).attr('name');
        if ((thisname.slice(0,5) == questname.slice(0,5)) && (thisname != questname)) {
            if ($(question).attr('checked') == 'checked') {
                $(this).attr('disabled','disabled');
            } else {
                $(this).removeAttr('disabled');
            }
        }
    });
}

