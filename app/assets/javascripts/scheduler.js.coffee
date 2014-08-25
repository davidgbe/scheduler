window.Scheduler =
  Models: {}
  Collections: {}
  Views: {}
  Routers: {}
  initialize: -> alert 'Hello from Backbone!'

$(document).ready ->
  Scheduler.initialize()
