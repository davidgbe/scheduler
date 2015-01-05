Scheduler.Views.WSSelectedSection = Backbone.View.extend({
  template: JST['workstation/selectedSection'],
  events: {
  },
  initialize: function(options) {
    this.model = options.model
  },
  render: function() {
    var data = { 
      days: this.model.get('days'),
      start: this.model.get('start'),
      finish: this.model.get('finish'),
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