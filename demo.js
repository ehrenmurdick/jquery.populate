$.populate.registerValues({
  confirmation: $.populate.data.is('password'),
  favoriteNumber: 42,
  username: $.populate.data.dependency('firstName', name => {
    if (Math.random() > 0.5) {
      return name + Math.randomInt(100);
    } else {
      return name;
    }
  })
});

$(() => {
  $('#pop').click(() => {
    $('input, select, textarea').populate();
  });
});
