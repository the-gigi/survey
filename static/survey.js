console.log('survey.js is here!!!');

var q1_selected = null;

function handle_q1_radio_click(id)
{
    if (q1_selected == id)
        return false;

    q1_selected = id;
    $('#q1b_section').toggleClass('hidden');
    $('#q1c_section').addClass('hidden');
    return true;
}

$('#q1_yes').click(function()
{
    console.log("Loading makes...")
    // load makes
    $.getJSON("/survey/car/makes",{ ajax: 'true' }, function(response)
    {
        var makes = response["makes"];
        var options = '';
        for (var i = 0; i < makes.length; i++)
        {
            var option = '<option value="' + makes[i] + '">' + makes[i] + '</option>';
            console.log('option ' + i + ': ' + option);
            options += option
        }
        $("select#q1b").html(options);
    })

    handle_q1_radio_click('q1_yes');
});
$('#q1_no').click(function() { handle_q1_radio_click('q1_no'); });
$('#q1_no').attr('checked', 'checked');

$("select#q1b").change(function()
{
    console.log("make selected")
    $.getJSON("/survey/car/models/" + $(this).val(),{ajax: 'true'}, function(response)
    {
        var models = response["models"];
        var options = '';
        for (var i = 0; i < models.length; i++)
        {
            options += '<option value="' + models[i] + '">' + models[i] + '</option>';
        }
        $("select#q1c").html(options);
        $('#q1c_section').removeClass('hidden');
    })
});

$("input#submitButton").click(function()
{
    $('form#survey').submit();
});


