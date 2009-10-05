$.populate.registerValues({
  confirmation: $.populate.data.is('password'),
  ccNum: '0000000000000000'
});

$(function() {
  $('#pop').click(function() {
    $('input, select, textarea').populate();
  });
});
