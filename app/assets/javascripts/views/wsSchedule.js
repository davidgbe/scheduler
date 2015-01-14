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
      var section = data.section
      if(section.get('rendered') === true) {
        continue
      }
      var drawnSection = new Scheduler.Views.WSDrawnSection(section, this, data.klass)
      this.drawnSections.push(drawnSection)
      drawnSection.render()
      section.set('rendered', true)
    }
  } 
})