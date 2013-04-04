
$("#qdriver_count_select").change(function() {
    var value = $("#qdriver_count_select").val();
    displayDriversTable(value);
});

$("input#submitButton").click(function()
{
    $('form#survey').submit();
});
