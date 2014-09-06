Scheduler.Models.Session = Backbone.Model.extend({
  initialize: function() {
    alert('Created a session')
  },
  urlRoot: '/sessions',
  loginAttempt: function(data) {
    this.set(data)
    this.save()
    this.clearPasswords()
  },
  clearPasswords: function() {
    if(_.has(this.attributes, 'password')) {
      delete this.attributes['password']
    }
    if(_.has(this._previousAttributes, 'password')) {
      delete this._previousAttributes['password']
    }
  }
})