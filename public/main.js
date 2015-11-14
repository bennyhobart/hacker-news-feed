/*global $*/
$('button').on('click', function (evt) {
    var id = this.attributes['data-id'].value;
    fetch('/post/' + id, {
        method: 'DELETE'
    }).then(function () {
        location.reload();
    });
    evt.stopPropagation();
});

$('tr').on('click', function () {
    var href = this.attributes['data-href'].value;
    window.open(href, '_blank');
});