Scheduler.Models.User = Backbone.Model.extend({
  initialize: function() {
    alert('Created a user')
  },
  url: '/users'
})