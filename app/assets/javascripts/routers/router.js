Scheduler.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    '':'welcome'
  },
  welcome: function() {
    var welcomeView = new Scheduler.Views.Welcome({ 
      el: '#content-login'
    })
    welcomeView.render()
  }
})