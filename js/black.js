//start 本地存储，快速回复
$('.articleHead').on('click', function() {

    if (localStorage['f_cmnt_view'] != getDay()) {
        $('.f_cmnt_view').show();
    }

});

function getDay() {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    date = y + '-' + m + '-' + d;
    return date;
}
$('.f_cmnt_view .close_btn').on('click', function() {
    $('.f_cmnt_view').hide();
});

$('.refresh').on('click', function() {

});

$('.checkbox').on('change', function() {


    if (localStorage.f_cmnt_view) {

    }
    if (this.checked) {
        localStorage.f_cmnt_view = getDay();
    } else {
        localStorage.removeItem('f_cmnt_view');
    }

});
//
$(window).on('click', '.cmnt_unfold', function() {
    $(this).hide();
    $(this).parent().find('.floor_item').removeClass('hide');
})
