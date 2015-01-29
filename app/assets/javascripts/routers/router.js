Scheduler.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    'login':'welcome',
    'main':'main',
    'workstation':'workstation'
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
  workstation: function() {
    var schedule = new Scheduler.Models.Schedule
    var workStation = new Scheduler.Views.WSMain({
      el: '#content',
      schedule: schedule
    })
    var calendarView = new Scheduler.Views.WSCalendar({ 
      el: '#content',
      count: 1,
      workStation: workStation,
      schedule: schedule
    })
    workStation.setCalendar(calendarView)
    workStation.render()
    calendarView.render()
  },
  route: function(route, name, callback) {
    if (!_.isRegExp(route)) route = this._routeToRegExp(route);
    if (!callback) callback = this[name];
    callback = _.wrap(callback, _.bind(function(cb) {
      if (Scheduler.session.isAuthenticated() || name === 'welcome') {
        _.bind(cb, this)();
      } else {
        this.navigate('login', {trigger: true});
      }
    }, this));
    Backbone.history.route(route, _.bind(function(fragment) {
      var args = this._extractParameters(route, fragment);
      callback && callback.apply(this, args);
      this.trigger.apply(this, ['route:' + name].concat(args));
      Backbone.history.trigger('route', this, name, args);
    }, this));
    return this;
  }
})