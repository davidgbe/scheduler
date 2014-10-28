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
    this.childSpacing = $(document).width()
    this.parallaxItems = [
      { title: '#trees-back', distance: 0.005 },
      { title: '#building', distance: 0.025 },
      { title: '#clock', distance: 0.07 },
      { title: '#trees-front', distance: 0.09 }
    ]
  },
  render: function() {
    var that = this
    var compiled = this.template({})
    this.$el.html(compiled)
    this.createChildViews()
    this.setChildMargins(this.childSpacing)
    $(window).on('resize', function() {
      that.centerCurrentView(that.carousel, that.currentView)
    })
    this.centerCurrentView(this.carousel, 0)
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
    this.parallax(spaces)
    this.currentView += spaces
    this.changeCurrentView(this.carousel, this.currentView)
  },
  changeCurrentView: function(carousel, currView) {
    var that = this
    $(carousel).transition(
      { 'left': this.currentViewPosition() }, 
      { duration: that.animationTime(), queue: false }
    )
  },
  centerCurrentView: function(carousel, currView) {
    $(carousel).css({ 'left': this.currentViewPosition() })
  },
  animationTime: function() {
    return 'slow'
  },
  setChildMargins: function(margin) {
    widths = []
    for(i = 0; i < 3; i++) {
      widths[i] = parseFloat( $(this.childViews[i].title).css('width') )
    }
    var firstMargin = margin - widths[0] / 2 - widths[1] / 2
    var secondMargin = margin - widths[1] / 2 - widths[2] / 2
    $(this.childViews[1].title).css('margin-left', firstMargin)
    $(this.childViews[2].title).css('margin-left', secondMargin)
  },
  currentViewPosition: function() {
    return $(window).width() / 2 - parseFloat( $(this.childViews[0].title).css('width') ) / 2 - this.currentView * this.childSpacing
  },
  parallax: function(spaces) {
    var that = this
    for(var i in this.parallaxItems) {
      var item = this.parallaxItems[i]
      $(item.title).transition(
        { 'left': parseFloat( $(item.title).css('left') ) - spaces * item.distance * $(window).width() }, 
        { duration: that.animationTime(), queue: false }
      )
    }
  }
})