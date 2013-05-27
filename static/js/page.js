

var last_page = parseInt($('.container').attr('data-total-pages')) - 1;

function nextPage()
{
    var page_number = parseInt($('.container').attr('data-page'));
    if (page_number == last_page)
    {
        return;
    }
    var curr_page_id = 'page' + page_number;
    var next_page_id = 'page' + (page_number + 1);

    console.log('nextPage() here - curr_page_id: ' + curr_page_id + ', next_page_id: ' + next_page_id);

    hide([curr_page_id]);
    show([next_page_id]);

    // Enable/disable buttons
    enable('next-page', (page_number + 1) < last_page);
    enable('prev-page', true);

    $('.container').attr('data-page', page_number + 1);
}

function prevPage()
{
    var page_number = parseInt($('.container').attr('data-page'));
    if (page_number == 0)
    {
        return;
    }
    var curr_page_id = 'page' + page_number;
    var prev_page_id = 'page' + (page_number - 1);

    console.log('prevPage() here - curr_page_id: ' + curr_page_id + ', prev_page_id: ' + prev_page_id);

    hide([curr_page_id]);
    show([prev_page_id]);

    // Enable/disable buttons
    enable('next-page', true);
    enable('prev-page', page_number > 1);

    $('.container').attr('data-page', page_number - 1);
}



