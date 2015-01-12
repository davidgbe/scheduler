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
      rowSpan: 2 * (this.finish - this.start)
    })
    this.$el.append(compiled)
    var root = this.schedule.$el.find('.schedule-table')
    for(var i = 2 * this.start; i < 2 * this.finish; i++) {
      root.find('tr:nth-child(' + (i - 9) + ')').remove()
    }
    if(this.start === 6) {
      root.prepend(this.$el)
    } else {
      root.find('tr:nth-child(' + (i - 8) + ')').after(this.$el)
    }
  },
  destroy: function() {
    this.undelegateEvents()
    this.$el.removeData().unbind()
    this.remove()
    Backbone.View.prototype.remove.call(this)
  }
})