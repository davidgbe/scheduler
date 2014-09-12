Scheduler.Views.About = Backbone.View.extend({
  template: JST['client/about_template'],
  events: {},
  initialize: function(options) {
    this.el = options.el
  },
  render: function() {
    var compiled = this.template({})
    this.$el.append(compiled)
  }
})