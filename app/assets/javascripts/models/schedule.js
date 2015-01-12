Scheduler.Models.Schedule = Backbone.Model.extend({
  initialize: function() {
    this.sections = []
  },
  urlRoot: '/schedules'
})