Scheduler.Views.WSSchedule = Backbone.View.extend({
  template: JST['workstation/schedule'],
  events: {
  },
  initialize: function(options) {
    this.schedule = options.schedule
    this.drawnSections = []
  },
  render: function() {
    var compiled = this.template({})
    this.$el.append(compiled)
    this.schedule.on('change', this.drawAllSections, this);
    return this
  },
  destroy: function() {
    this.undelegateEvents()
    this.$el.removeData().unbind()
    this.remove()
    Backbone.View.prototype.remove.call(this)
  }, 
  drawAllSections: function() {
    console.log('CALLED')
    for(var i in this.schedule.sections) {
      var drawnSection = new Scheduler.Views.WSDrawnSection(this.schedule.sections[i], this)
      this.drawnSections.push(drawnSection)
      drawnSection.render()
      console.log('called1')
    }
  } 
})