Scheduler.Views.Login = Backbone.View.extend({
  template: JST['client/login_template'],
  events: {
    'click #login-button': 'login'
  },
  initialize: function(options) {
    this.el = options.el
  },
  render: function() {
    var compiled = this.template({})
    this.$el.append(compiled)
  },
  login: function() {
    data = { user_name: $('#username').val(), password: $('#password').val() }
    console.log(data)
    Scheduler.session.loginAttempt(data)
  }
})