Scheduler.Views.WSSchedule = Backbone.View.extend({
  template: JST['workstation/schedule'],
  events: {
  },
  initialize: function(options) {
    this.schedule = options.schedule
    this.drawnSections = []
    this.iterations = []
    this.index = 0
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
  nextIteration: function() {
    this.iterate(1)
  },
  previousIteration: function() {
    this.iterate(-1)
  },
  iterate: function(inc) {
    var nextPlace = (this.index + inc) % this.iterations.length
    var newIteration = []
    this.iterations[nextPlace].map(function(s) {
      newIteration.push({
        section: s,
        klass: s.parent
      })
    })
    this.schedule.set('sections', newIteration)
    this.schedule.trigger('change')
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