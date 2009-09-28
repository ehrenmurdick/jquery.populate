var Populate = {
  getValue: function(kind) {
    if (Populate.Data[kind]) {
      if (typeof(Populate.Data[kind]) == 'function') {
        return Populate.Data[kind]();
      } else {
        return Populate.Data[kind].random();
      }
    }
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

Populate.Data = {
  firstName: ['Aaron', 'Bob', 'Steve', 'Hugh', 'Jon', 'Jessica', 'Thais', 'Amadeus', 'Wolfgang', 'Alabaster'],
  lastName: ['Hancock', 'Jass', 'Mozart'],
  domain: ['google.com', 'yahoo.com', 'msn.com'],
  username: function() {
    return Populate.getValue('firstName') +
              Math.randInt(1000);
  },
  email: function() {
    return Populate.getValue('username') + '@' + Populate.getValue('domain');
  },
  password: ['password']
}

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



Array.prototype.random = function() {
  return this[Math.randInt(this.length)];
}


Math.randInt = function(size){
  var rNum = Math.floor(Math.random()*size);

  return rNum;
}

