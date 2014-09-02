Scheduler.Views.Login = Backbone.View.extend({
  template: JST['client/login_template'],
  events: {},
  initialize: function(options) {
    this.el = options.el
  },
  render: function() {
    var compiled = this.template({})
    this.$el.html(compiled)
  }
})