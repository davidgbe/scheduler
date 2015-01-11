Scheduler.Views.WSSearchedSection = Backbone.View.extend({
  template: JST['workstation/searchedSection'],
  events: {
    
  },
  initialize: function(options) {
    this.model = options.model
  },
  render: function() {
    var data = { 
      days: this.model.parsedDays(),
      start: this.model.startAsReadableString(),
      finish: this.model.finishAsReadableString(),
      maxCapacity: this.model.get('max_capacity'),
      currentCapacity: this.model.get('current_capacity')
    }
    if(data.days == null || data.days == {} || data.days === '{}') {
      data.days = 'None'
    }

    var compiled = this.template(data)
    this.$el.append(compiled)

    return this
  }
})