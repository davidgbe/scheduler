Scheduler.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    'login':'welcome'
  },
  welcome: function() {
    var welcomeView = new Scheduler.Views.Welcome({ 
      el: '#content-login'
    })
    welcomeView.render()
  }
})