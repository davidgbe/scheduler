Scheduler.Views.Welcome = Backbone.View.extend({
  template: JST['client/welcome_template'],
  events: {},
  initialize: function(options) {
    this.el = options.el
    this.carousel = '#welcome-carousel'
  },
  render: function() {
    var compiled = this.template({})
    this.$el.html(compiled)
    this.createChildViews()
    this.childViews[0].show()
  },
  createChildViews: function() {
    var loginView = new Scheduler.Views.Login({
      el: this.carousel
    })
    var joinView = new Scheduler.Views.Join({
      el: this.carousel
    })
    this.childViews = [
      loginView,
      joinView
    ]
    for (var position in this.childViews) {
      var thisView = this.childViews[position]
      thisView.render()
      thisView.hide()
    }
  },
  shiftRight: function() {
    //$(this.carousel).animate({ left: })
  },
  shiftLeft: function() {

  }
})