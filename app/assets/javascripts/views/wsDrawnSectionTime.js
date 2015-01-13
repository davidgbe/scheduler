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
    this.rendered = false
  }, 
  render: function() {
    var compiled = this.template({
      rowSpan: 2 * (this.finish - this.start)
    })
    this.$el.append(compiled)

    var toAppend = this.$el.find('td')
    this.root = this.schedule.$el.find('.schedule-table')

    for(var i = 2 * this.start; i < 2 * this.finish; i++) {
      var row = this.root.find('tr:nth-child(' + (i - 9) + ')')
      row.find('td:nth-child(' + this.daysOrder[this.day] + ')').remove()
    }
    var insertRow = this.root.find('tr:nth-child(' + (2 * this.start - 9) + ')')
    if(this.day === 'U') {
      insertRow.prepend(toAppend)
    } else {
      insertRow.find('td:nth-child(' + this.daysOrder[this.day] + ')').after(toAppend)
    }
    toAppend.css({
      'border-color': '#26C7FF', 
      'border-width':'2px', 
      'border-style':'solid'
    })
    this.rendered = true
  },
  destroy: function() {
    if(this.rendered) {
      var removeRow = this.root.find('tr:nth-child(' + (2 * this.start - 9) + ')')
      removeRow.find('td:nth-child(' + this.daysOrder[this.day] + ')').remove()
      for(var i = 2 * this.start; i < 2 * this.finish; i++) {
        var row = this.root.find('tr:nth-child(' + (i - 9) + ')')
        var num = this.daysOrder[this.day]
        if(num === 1) {
          row.preprend('<td></td>')
        } else {
          row.find('td:nth-child(' + (this.daysOrder[this.day] - 1) + ')').after('<td></td>')
        }
      }
    }
    this.undelegateEvents()
    this.$el.removeData().unbind()
    this.remove()
    Backbone.View.prototype.remove.call(this)
  }
})