Scheduler.Views.Login = Backbone.View.extend({
  template: JST['client/login_template'],
  events: {
    'click #entry': 'login'
  },
  initialize: function(options) {
    this.el = options.el
  },
  render: function() {
    var compiled = this.template({})
    this.$el.html(compiled)
  },
  login: function() {
    data = { user_name: $('#username').val(), password: $('#password').val() }
    Scheduler.session.loginAttempt(data)
  },
  show: function() {
    $(this.el).show()
  },
  hide: function() {
    $(this.el).hide()
  }
})