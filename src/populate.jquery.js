var Populate = {
  getValue: function(kind) {
    return {firstName: 'Ehren',
     lastName: 'Murdick'}[kind];
  }
}

$.fn.pop = function(kind) {
  return $(this).each(function() {
    $(this).val(Populate.getValue(kind));
  });
}
