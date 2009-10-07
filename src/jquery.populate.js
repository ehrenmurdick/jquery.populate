/*
 *   jquery.populate version 1.1
 *   (c)) 2009 Ehren Murdick
 *
 *---------------------------------*/



(function() {

$.populate = {
  previous: {},

  registerValues: function(obj) {
    $.extend($.populate.data, obj);
  },

  getValue: function(kind, deferred) {
    if ($.populate.data[kind]) {
      if (typeof($.populate.data[kind]) == 'function') {
        return $.populate.previous[kind] = $.populate.data[kind](deferred);
      } else if (typeof($.populate.data[kind]) == 'object') {
        return $.populate.previous[kind] = $.populate.data[kind].random();
      } else {
        return $.populate.previous[kind] = $.populate.data[kind];
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
    if (kind == undefined) kind = $.populate.getName(element);
    var value = $.populate.getValue(kind);
    if (value == '__defer__') {
      setTimeout(function() {
        element.val($.populate.getValue(kind, true));
      }, 100);
    } else {
      element.val(value);
    } 
  }
};

$.populate.data = {
  loremWord: ["Lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "Aenean", "felis", "luctus", "blandit", "nec", "rutrum", "mi", "Vestibulum"],
  is: function(type) {
    return $.populate.data.dependency(type, function(thing) {
      return thing;
    });
  },
  dependency: function(type, getter) {
    return function(deferred) {
      var dep = $.populate.previous[type];
      if (dep == undefined) {
        if (!deferred) return '__defer__';
        else dep = $.populate.getValue(type);
      }
      return getter(dep);
    }
  },
  randomAlnum: function(size) {
    return function() {
      var str = "";
      var i;
      for (i=0;i<size;++i) {
        str  = str + ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9].random();
      }
      return str;
    }
  },
  randomNumeral: function(size) {
    return function() {
      var range = Math.pow(10, size) - Math.pow(10, size - 1) - 1;
      return Math.randInt(range) + Math.pow(10, size - 1);
    }
  },

  lorem: function(words) {
    return function() {
      var i;
      str = "";
      for(i=0;i<words;++i) {
        str = str + " " + $.populate.getValue('loremWord');
      }
      return str;
    }
  }

};

$.extend($.populate.data, {
  firstName: ['Aaron', 'Bob', 'Steve', 'Hugh', 'Jon', 'Jessica', 'Thais', 'Amadeus', 'Wolfgang', 'Alabaster', 'Joe', 'Conan', 'Jim', 'Rod', 'The'],
  lastName: ['Hancock', 'Jass', 'Mozart', 'Stewart', 'Monkey', 'Town', 'Dumass', 'Nümminen', 'Bearnt', 'Distad', 'Barker', 'O\'Brien', 'Shadow'],
  domain: ['google.com', 'yahoo.com', 'msn.com'],
  city: ['Delaware', 'Columbus', 'Athens', 'Roanoke', 'Springfield'],
  state: ['OH', 'CA', 'AR', 'NY', 'NC', 'NV', 'IN', 'IL', 'KY', 'TN', 'WV', 'VA', 'MI', 'WI'],
  street: ['1st', '2nd', '3rd', '4th', '5th', 'Indianola', 'Copeland', 'Latta', 'Lafayette', 'Presidential', 'Palmer', 'High'],
  streetEnding: ['Pkwy', 'Ave', 'St', 'Ln', 'Dr', 'Tr', 'Ct'],

  username: $.populate.data.dependency('firstName', function(name) {
    return name + Math.randInt(1000);
  }),

  email: $.populate.data.dependency('firstName', function(theName) {
    return theName + '@' + $.populate.getValue('domain');
  }),

  website: $.populate.data.dependency('domain', function(domain) {
    return 'http://' + domain;
  }),

  password: 'password',

  passwordConfirmation: $.populate.data.is('password'),

  address: function() {
    return $.populate.data.randomNumeral(4)() + ' ' + $.populate.getValue('street') + ' ' + $.populate.getValue('streetEnding');
  },

  notes: $.populate.data.lorem(20)
});

  
  
  
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


$.fn.populate = function(kind) {
  return $(this).each(function() {
    $.populate.populate(this, kind);
  });
};

})(jQuery);
