Scheduler.Models.Session = Backbone.Model.extend({
  initialize: function() {},
  urlRoot: '/sessions',
  loginAttempt: function(data) {
    var that = this
    this.set(data)
    this.save(null, {
      success: function() {
        that.clearPasswords()
        window.location.hash = 'main'
      },
      error: function() {
        alert('FUCK YOU GET IT RIGHT')
      }
    })
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