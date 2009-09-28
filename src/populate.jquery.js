var Populate = {
  getValue: function(kind) {
    return {firstName: 'Ehren',
     lastName: 'Murdick'}[kind];
  },

  getName: function(element) {
    element = $(element);
    var name = element.attr('name');
    if (name.match(/\[/)) {
      name = name.replace(/^.*\[/, '').replace(']', '');
    }

    return name.camelize();
  }
};

$.fn.pop = function(kind) {
  return $(this).each(function() {
    if (kind == undefined) {
      var type = Populate.getName(this);
      $(this).val(Populate.getValue(type));
    } else { 
      $(this).val(Populate.getValue(kind));
    }
  });
};
  
  
  
// Copied wholesale from prototype.js
String.prototype.camelize = function() {
  var parts = this.split('_'), len = parts.length;
  if (len == 1) return parts[0];

  var camelized = this.charAt(0) == '_'
    ? parts[0].charAt(0).toUpperCase() + parts[0].substring(1)
    : parts[0];

  for (var i = 1; i < len; i++)
    camelized += parts[i].charAt(0).toUpperCase() + parts[i].substring(1);

  return camelized;
}
