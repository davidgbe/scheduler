Scheduler.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    'login':'welcome',
    'main':'main'
  },
  welcome: function() {
    var welcomeView = new Scheduler.Views.Welcome({ 
      el: '#content'
    })
    welcomeView.render()
  },
  main: function() {
    var mainView = new Scheduler.Views.Main({
      el: '#content'
    })
    mainView.render()
  }
})