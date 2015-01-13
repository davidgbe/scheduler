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
      rowSpan: 2 * (this.finish - this.start),
    })
    this.$el.append(compiled)

    var toAppend = this.$el.find('td')
    console.log(toAppend)
    toAppend.addClass( ('' + this.daysOrder[this.day]) )

    this.root = this.schedule.$el.find('.schedule-table')

    for(var i = 2 * this.start; i < 2 * this.finish; i++) {
      var row = this.root.find('tr:nth-child(' + (i - 9) + ')')
      row.find('.' + this.daysOrder[this.day]).remove()
    }
    var insertRow = this.root.find('tr:nth-child(' + (2 * this.start - 9) + ')')
    if(this.daysOrder[this.day] === 1) {
      insertRow.prepend(toAppend)
    } else {
      var pos = 1;
      while(insertRow.find('.' + (this.daysOrder[this.day] - pos) ).length === 0 && this.daysOrder[this.day] - pos !== 0) {
        pos++
      }
      if(this.daysOrder[this.day] - pos === 0) {
        insertRow.prepend(toAppend)
      } else {
        insertRow.find('.' + (this.daysOrder[this.day] - pos) ).after(toAppend)
      }
    }
    toAppend.css({
      'border-color': '#26C7FF', 
      'border-width':'2px', 
      'border-style':'solid'
    })
    this.rendered = true
  },
  destroy: function() {
    var removeRow = this.root.find('tr:nth-child(' + (2 * this.start - 9) + ')')
    removeRow.find('.' + this.daysOrder[this.day]).remove()
    var toAppend = '<td class="' + this.daysOrder[this.day]+ '"></td>'
    for(var j = 2 * this.start; j < 2 * this.finish; j++) {
      var insertRow = this.root.find('tr:nth-child(' + (j - 9) + ')')
      if(this.daysOrder[this.day] === 1) {
        insertRow.prepend(toAppend)
      } else {
        var pos = 1;
        while(insertRow.find('.' + (this.daysOrder[this.day] - pos) ).length === 0 && this.daysOrder[this.day] - pos !== 0) {
          pos++
        }
        if(this.daysOrder[this.day] - pos === 0) {
          insertRow.prepend(toAppend)
        } else {
          insertRow.find('.' + (this.daysOrder[this.day] - pos) ).after(toAppend)
        }
      }
    }

    // this.undelegateEvents()
    // this.$el.removeData().unbind()
    // this.remove()
    // Backbone.View.prototype.remove.call(this)
  }
})