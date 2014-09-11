Scheduler.Views.Welcome = Backbone.View.extend({
  template: JST['client/welcome_template'],
  events: {},
  initialize: function(options) {
    this.el = options.el
    this.carousel = '#welcome-carousel'
  },
  render: function() {
    var that = this
    var compiled = this.template({})
    this.$el.html(compiled)
    this.createChildViews()
    $(window).on('resize', function() {
      that.centerCurrentView(that.carousel, that.currentView)
    })
    setTimeout( function() {
      that.shiftRight()
    },
    5000)
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
    }
    this.currentView = 0
  },
  shiftRight: function() {
    if(this.currentView < 1) {
      this.currentView += 1
      this.changeCurrentView(this.carousel, this.currentView)
    }
  },
  shiftLeft: function() {
    if(this.currentView) {
      this.currentView -= 1
      this.changeCurrentView(this.carousel, this.currentView)
    }
  },
  changeCurrentView: function(carousel, currView) {
    $(carousel).animate(
      { 'left': $(window).width() / 2 - 190 - currView * 1000 + 'px' }, 
      { duration: 600, queue: false }
    )
  },
  centerCurrentView: function(carousel, currView) {
    $(carousel).css({ 'left': $(window).width() / 2 - 190 - currView * 1000 + 'px' })
  }
})