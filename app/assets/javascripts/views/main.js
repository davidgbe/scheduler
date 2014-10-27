Scheduler.Views.Main = Backbone.View.extend( {
  template: JST['scheduler_home'],
  events: {},
  initialize: function(options) {
    this.el = options.el
  },
  render: function() {
    var compiled = this.template({})
    this.$el.html(compiled)
  },
  createChildViews: function() {
    
  }

})