var Klass = Backbone.Model.extend({
  initialize: function() {
    alert('You have created a new class')
  },
  url: '/klasses'
})


window.Scheduler.Models['Klass'] = Klass