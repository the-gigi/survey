
$("#qdriver_count_select").change(function() {
    var value = $("#qdriver_count_select").val();
    DisplayDriversTable(value);
});

$("input#submitButton").click(function()
{
    $('form#survey').submit();
});
