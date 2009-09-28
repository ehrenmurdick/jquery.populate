var Populate = {
  previous: {},

  getValue: function(kind, deferred) {
    if (Populate.Data[kind]) {
      if (typeof(Populate.Data[kind]) == 'function') {
        return Populate.previous[kind] = Populate.Data[kind](deferred);
      } else if (typeof(Populate.Data[kind]) == 'object') {
        return Populate.previous[kind] = Populate.Data[kind].random();
      } else {
        return Populate.previous[kind] = Populate.Data[kind];
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
  },

  populate: function(element, kind) {
    element = $(element);
    if (kind == undefined) kind = Populate.getName(element);
    var value = Populate.getValue(kind);
    if (value == '__defer__') {
      setTimeout(function() {
        element.val(Populate.getValue(kind, true));
      }, 100);
    } else {
      element.val(value);
    } 
  }
};

Populate.Data = {
  is: function(type) {
    return Populate.Data.dependsOn(type, function(thing) {
      return thing;
    });
  },
  dependsOn: function(type, getter) {
    return function(deferred) {
      var dep = Populate.previous[type];
      if (dep == undefined) {
        if (!deferred) return '__defer__';
        else dep = Populate.getValue(type);
      }
      return getter(dep);
    }
  }
};

var dependsOn = Populate.Data.dependsOn;
$.extend(Populate.Data, {
  firstName: ['Aaron', 'Bob', 'Steve', 'Hugh', 'Jon', 'Jessica', 'Thais', 'Amadeus', 'Wolfgang', 'Alabaster'],
  lastName: ['Hancock', 'Jass', 'Mozart'],
  domain: ['google.com', 'yahoo.com', 'msn.com'],
  username: dependsOn('firstName', function(name) {
    return name + Math.randInt(1000);
  }),

  email: dependsOn('firstName', function(theName) {
    return theName + '@' + Populate.getValue('domain');
  }),

  website: dependsOn('domain', function(domain) {
    return 'http://' + domain;
  }),

  password: 'password'
});

$.fn.pop = function(kind) {
  return $(this).each(function() {
    Populate.populate(this, kind);
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

