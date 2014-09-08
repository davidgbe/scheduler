Scheduler.Views.Join = Backbone.View.extend({
  template: JST['client/join_template'],
  events: {},
  initialize: function(options) {
    this.el = options.el
  },
  render: function() {
    var compiled = this.template({})
    this.$el.html(compiled)
  },
  register: function() {
    //TODO
  },
  show: function() {
    $(this.el).show()
    $(this.el).css('margin-left', 'auto')
  },
  hide: function() {
    $(this.el).hide()
    $(this.el).css('margin-left', '600px')
  }
})