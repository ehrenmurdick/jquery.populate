$.extend(Populate.Data, {
  confirmation: Populate.Data.is('password')
});

$(function() {
  $('#pop').click(function() {
    $('input').pop();
  });
});
