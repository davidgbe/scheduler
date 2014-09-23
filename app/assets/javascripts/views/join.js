Scheduler.Views.Join = Backbone.View.extend({
  template: JST['client/join_template'],
  events: {
    'click #join-button': 'register'
  },
  initialize: function(options) {
    this.el = options.el
    this.title = '#join'
  },
  render: function() {
    var compiled = this.template({})
    this.$el.append(compiled)
  },
  register: function() {
    var data = {
      first_name: $('#join-first').val(),
      last_name: $('#join-last').val(),
      email: $('#join-email').val(),
      password: $('#join-password').val()
    }
    var valid = true
    for(var field in data) {
      if(!data[field]) {
        alert(field + ' was empty. Try again.')
        valid = false
      }
    }
    if(valid) {
      var user = new Scheduler.Models.User(data)
      user.save()
    }
  }
})