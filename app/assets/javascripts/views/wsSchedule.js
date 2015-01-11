Scheduler.Views.WSSchedule = Backbone.View.extend({
  template: JST['workstation/schedule'],
  events: {
  },

  initialize: function(options) {
    this.sections = options.sections
  },
  render: function() {
    var compiled = this.template({})
    this.$el.append(compiled)
    return this
  },
  destroy: function() {
    this.undelegateEvents()
    this.$el.removeData().unbind()
    this.remove()
    Backbone.View.prototype.remove.call(this)
  }, 
  drawAllSections: function() {

  }
})