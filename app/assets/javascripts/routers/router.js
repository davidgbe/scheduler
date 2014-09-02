Scheduler.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    'login':'login'
  },
  login: function() {
    var loginView = new Scheduler.Views.Login({ 
      el: '#content-login'
    })
    loginView.render()
  }
})