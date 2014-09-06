Scheduler.Views.Welcome = Backbone.View.extend({
  template: JST['client/welcome_template'],
  events: {},
  initialize: function(options) {
    this.el = options.el
  },
  render: function() {
    var compiled = this.template({})
    this.$el.html(compiled)
    this.loginView = new Scheduler.Views.Login({
      el: '#pulse-login'
    })
    this.loginView.render()
  }
})