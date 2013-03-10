console.log('survey.js is here!!!');

var q1_selected = null;

function handle_q1_radio_click(id)
{
    if (q1_selected == id)
        return false;

    q1_selected = id;
    console.log('Not selected yet');
    $('#q1b_section').toggleClass('hidden');
    return true;
}


$('#q1_yes').click(function() { handle_q1_radio_click('q1_yes'); });
$('#q1_no').click(function() { handle_q1_radio_click('q1_no'); });
$('#q1_no').attr('checked', 'checked');
//$('#q1_yes').click(function()
//{
//    if (q1_selected == 'q1_yes')
//        return false;
//
//    q1_selected = 'q1_yes';
//    console.log('Not selected yet');
//    $('#q1b_section').toggleClass('hidden');
//    return true;
//});

//$('#q1_no').click(function()
//{
//    if (q1_selected == 'q1_no')
//        return false;
//
//    q1_selected = 'q1_no';
//    $('#q1b_section').toggleClass('hidden');
//    return true;
//});



