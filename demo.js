$.extend(Populate.Data, {
  confirmation: Populate.Data.is('password'),
  ccNum: '0000000000000000'
});

$(function() {
  $('#pop').click(function() {
    $('input').pop();
  });
});
