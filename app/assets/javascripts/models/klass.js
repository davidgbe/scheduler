Scheduler.Models.Klass = Backbone.Model.extend({
  initialize: function() {
    this.lock = false
  },
  urlRoot: '/klasses'
})