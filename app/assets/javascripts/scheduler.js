window.Scheduler = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    this.router = new this.Routers.AppRouter()
    this.session = new this.Models.Session()
    Backbone.history.start()
  }
};

$(document).ready(function(){
  Scheduler.initialize();
});
