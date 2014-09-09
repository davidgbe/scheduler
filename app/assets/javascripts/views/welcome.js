Scheduler.Views.Welcome = Backbone.View.extend({
  template: JST['client/welcome_template'],
  events: {},
  initialize: function(options) {
    this.el = options.el
  },
  render: function() {
    var compiled = this.template({})
    this.$el.html(compiled)
    this.createChildViews()
    this.selectView('login')
  },
  createChildViews: function() {
    var loginView = new Scheduler.Views.Login({
      el: '#welcome-carousel'
    })
    var joinView = new Scheduler.Views.Join({
      el: '#welcome-carousel'
    })
    this.childViews = {
      login: loginView,
      join: joinView
    }
    for (var key in this.childViews) {
      console.log(key)
      var thisView = this.childViews[key]
      thisView.render()
      thisView.hide()
    }
  },
  selectView: function(view) {
    if(this.currentView != view) {
      if(this.currentView) {
        this.childViews[this.currentView].hide()
      }
      this.currentView = view
      this.childViews[view].show()
    }
  }
})