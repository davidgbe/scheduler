Scheduler.Views.Welcome = Backbone.View.extend({
  template: JST['client/welcome_template'],
  events: {
    'click #welcome-about-button': 'aboutButtonClick',
    'click #welcome-join-button': 'joinButtonClick',
    'click #welcome-login-button': 'loginButtonClick'
  },
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
  },
  createChildViews: function() {
    var loginView = new Scheduler.Views.Login({
      el: this.carousel
    })
    var joinView = new Scheduler.Views.Join({
      el: this.carousel
    })
    var aboutView = new Scheduler.Views.About({
      el: this.carousel
    })

    this.childViews = [
      loginView,
      joinView,
      aboutView
    ]
    for (var position in this.childViews) {
      var thisView = this.childViews[position]
      thisView.render()
    }
    this.currentView = 0
  },
  loginButtonClick: function() {
    this.shift(0 - this.currentView)
  },
  joinButtonClick: function() {
    this.shift(1 - this.currentView)
  },
  aboutButtonClick: function() {
    this.shift(2 - this.currentView)
  },
  shift: function(spaces) {
    if( !spaces || (spaces > 0 && this.currentView + spaces > 2) || (spaces < 0 && this.currentView - spaces < 0) ) {
      return
    }
    this.currentView += spaces
    this.changeCurrentView(this.carousel, this.currentView)
  },
  changeCurrentView: function(carousel, currView) {
    $(carousel).animate(
      { 'left': $(window).width() / 2 - 190 - currView * 980 + 'px' }, 
      { duration: 600, queue: false }
    )
  },
  centerCurrentView: function(carousel, currView) {
    $(carousel).css({ 'left': $(window).width() / 2 - 190 - currView * 980 + 'px' })
  }
})