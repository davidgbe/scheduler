Scheduler.Models.Schedule = Backbone.Model.extend({
  initialize: function() {
    this.sections = []
    this.sectionsNum = 0
  },
  urlRoot: '/schedules'
})