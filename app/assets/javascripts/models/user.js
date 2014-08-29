Scheduler.Models.User = Backbone.Model.extend({
  initialize: function() {
    alert('Created a user')
  },
  urlRoot: '/users'
})