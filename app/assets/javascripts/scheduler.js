window.Scheduler = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    console.log(this)
    this.router = new this.Routers.AppRouter()
    Backbone.history.start()
  }
};

$(document).ready(function(){
  Scheduler.initialize();
});
