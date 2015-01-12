Scheduler.Views.WSSelectedSection = Backbone.View.extend({
  template: JST['workstation/selectedSection'],
  events: {
  },
  initialize: function(options) {
    this.model = options.model
    this.schedule = options.schedule
  },
  render: function() {
    var data = { 
      days: this.model.parsedDays(),
      start: this.model.startAsReadableString(),
      finish: this.model.finishAsReadableString(),
      maxCapacity: this.model.get('max_capacity'),
      currentCapacity: this.model.get('current_capacity')
    }
    var compiled = this.template(data)
    this.$el.append(compiled)
    return this
  },
  destroy: function() {
    this.undelegateEvents()
    this.$el.removeData().unbind()
    this.remove()
    Backbone.View.prototype.remove.call(this)
  }
})