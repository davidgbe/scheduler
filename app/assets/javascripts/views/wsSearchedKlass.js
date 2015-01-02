Scheduler.Views.WSSearchedKlass = Backbone.View.extend({
  template: JST['workstation/searchedKlass'],
  events: {
    
  },
  initialize: function(options) {
    this.el = options.el
    this.model = options.model
  },
  render: function() {
    console.log(this.model)
    var data = this.model.get('description')
    var compiled = this.template({ data: data })
    this.$el.append(compiled)
  }
})