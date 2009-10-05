$.populate.registerValues({
  confirmation: $.populate.data.is('password'),
  favoriteNumber: 42,
  username: $.populate.data.dependency('firstName', function(name) {
    if (Math.random() > 0.5) {
      return name + Math.randInt(100);
    } else {
      return name;
    }
  })
});

$(function() {
  $('#pop').click(function() {
    $('input, select, textarea').populate();
  });
});
