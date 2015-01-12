Scheduler.Views.WSDrawnSectionTime = Backbone.View.extend({
  template: JST['workstation/drawnSectionTime'],
  events: {
  },
  daysOrder: {
    U: 1,
    M: 2,
    T: 3, 
    W: 4,
    H: 5,
    F: 6,
    S: 7
  },
  initialize: function(options) {
    this.start = options.start
    this.finish = options.finish
    this.day = options.day
    this.schedule = options.schedule
    this.parent = options.parent
  }, 
  render: function() {
    var compiled = this.template({
      rowSpan: 2 * (this.finish - this.start)
    })
    this.$el.append(compiled)

    var root = this.schedule.$el.find('.schedule-table')

    for(var i = 2 * this.start; i < 2 * this.finish; i++) {
      console.log('time: ' + i)
      var row = root.find('tr:nth-child(' + (i - 9) + ')')
      row.find('td:nth-child(' + this.daysOrder[this.day] + ')').remove()
    }
    var insertRow = root.find('tr:nth-child(' + (2 * this.start - 9) + ')')
    if(this.day === 'U') {
      insertRow.prepend(this.$el.find('td'))
    } else {
      insertRow.find('td:nth-child(' + this.daysOrder[this.day] + ')').after(this.$el.find('td'))
    }
    this.$el.find('td').css('border', '2px solid #0FC1FF')
  },
  destroy: function() {
    this.undelegateEvents()
    this.$el.removeData().unbind()
    this.remove()
    Backbone.View.prototype.remove.call(this)
  }
})