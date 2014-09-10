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
    $(window).on('resize', this.centerCurrentView)
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
    this.currentView = 0
    this.childViews[this.currentView].show()
  },
  shiftRight: function() {
    var that = this
    setTimeout(function() {
      $(that.carousel).animate({ 'left': '-=1150px' })
    },
    5000)
  },
  shiftLeft: function() {

  },
  centerCurrentView: function() {
    console.log($(window).width() - 3 * 800 + 'px')
    $(this.carousel).css('left', $(window).width() - 3 * 800)
  }
})