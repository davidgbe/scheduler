Scheduler.Views.WSSelectedSection = Backbone.View.extend({
  template: JST['workstation/selectedSection'],
  events: {
    'click .section': 'toggleSelect'
  },
  initialize: function(options) {
    this.model = options.model
    this.schedule = options.schedule
    this.parent = options.parent
  },
  render: function() {
    var data = { 
      days: this.model.parsedDays(),
      start: this.model.startAsReadableString(),
      finish: this.model.finishAsReadableString(),
      maxCapacity: this.model.get('max_capacity'),
      currentCapacity: this.model.get('current_capacity'),
      teachers: this.model.get('teachers')
    }
    var compiled = this.template(data)
    this.$el.append(compiled)
    return this
  },
  toggleSelect: function() {
    this.parent.selectSection(this.model)
    this.parent.$el.find('.selected-selected-section').removeClass('selected-selected-section')
    this.$el.find('.section').addClass('selected-selected-section')
    return false
  },
  destroy: function() {
    this.undelegateEvents()
    this.$el.removeData().unbind()
    this.remove()
    Backbone.View.prototype.remove.call(this)
  }
})