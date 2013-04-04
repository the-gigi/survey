$('#qdriver_count_select').change(function() {
  displayDriversTable($('#qdriver_count_select').val());
});

$('#qadditional_cars_select').change(function() {
  show([1, 2])
});

$('#qcar_make_select').change(function() {
  show(['car_model'])
});

$('input#submitButton').click(function()
{
    $('form#survey').submit();
});