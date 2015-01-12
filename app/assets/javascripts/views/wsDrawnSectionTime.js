Scheduler.Views.WSDrawnSectionTime = Backbone.View.extend({
  template: JST['workstation/drawnSectionTime'],
  events: {
  },
  initialize: function(options) {
    this.start = options.start
    this.finish = options.finish
    this.days = options.days
    this.schedule = options.schedule
    this.parent = options.parent
  },
  render: function() {
    var compiled = this.template({
      rowSpan: 2 * (this.finish - this.finish)
    })
    this.$el.append(compiled)
    
  },
  destroy: function() {
    this.undelegateEvents()
    this.$el.removeData().unbind()
    this.remove()
    Backbone.View.prototype.remove.call(this)
  }
})