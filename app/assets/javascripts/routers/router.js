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
  },
  route: function(route, name, callback) {
  if (!_.isRegExp(route)) route = this._routeToRegExp(route);
  if (!callback) callback = this[name];
  _.wrap(callback, function(cb) {
    if (userIsLoggedIn()) {
      cb();
    } else {
      this.navigate('login');
    }
  });
  Backbone.history.route(route, _.bind(function(fragment) {
    var args = this._extractParameters(route, fragment);
    callback && callback.apply(this, args);
    this.trigger.apply(this, ['route:' + name].concat(args));
    Backbone.history.trigger('route', this, name, args);
  }, this));
  return this;
}
})