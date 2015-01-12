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
    for(var i in this.schedule.sections) {
      var data = this.schedule.sections[i]
      if(data.rendered === true) {
        continue
      }
      var drawnSection = new Scheduler.Views.WSDrawnSection(data.model, this)
      this.drawnSections.push(drawnSection)
      drawnSection.render()
      data.rendered = true
    }
  } 
})