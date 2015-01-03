Scheduler.Views.WSSearchedSection = Backbone.View.extend({
  template: JST['workstation/searchedSection'],
  events: {
    
  },
  initialize: function(options) {
    this.el = options.el
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
    if(data.days == null || data.days == {} || data.days === '{}') {
      data.days = 'None'
    }
    var compiled = this.template(data)
    this.$el.append(compiled)
  }
})