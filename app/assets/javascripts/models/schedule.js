Scheduler.Models.Schedule = Backbone.Model.extend({
  initialize: function() {
    this.klasses = []
  },
  urlRoot: '/schedules'
})