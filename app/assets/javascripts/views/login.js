Scheduler.Views.Login = Backbone.View.extend({
  template: JST['client/login_template'],
  events: {
    'click #login-button': 'login'
  },
  initialize: function(options) {
    this.el = options.el
    this.title = '#login'
  },
  render: function() {
    var compiled = this.template({})
    this.$el.append(compiled)
    $('#login-form').keyup(function(event){
      if(event.keyCode == 13){
        $("#login-button").click()
      }
    })
  },
  login: function() {
    var data = { email: $('#email').val(), password: $('#password').val() }
    Scheduler.session.loginAttempt(data)
  }
})