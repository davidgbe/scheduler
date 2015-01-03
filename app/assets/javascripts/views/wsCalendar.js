Scheduler.Views.WSCalendar = Backbone.View.extend({
  template: JST['workstation/calendar'],
  events: {
    'click .dot': 'dotClick'
  },
  initialize: function(options) {
    this.el = options.el
    this.carouselCount = 4
    this.currentPos = 1
    this.shiftWidth = 700
  },
  render: function() {
    var compiled = this.template({})
    this.$el.append(compiled)

    var dots = $('.dots')
    dots.empty()
    for(var i = 0; i < this.carouselCount; i++) {
      var c = 'dot'
      if(i === 0) {
        c += ' selected-dot'
      }
      dots.append('<div id="' + (i+1) + '" class="' + c + '"></div>')
    }
  },
  updateBubble: function() {
    $('.selected-dot').removeClass('selected-dot')
    $('.dot:nth-of-type(' + this.currentPos + ')').addClass('selected-dot')
  },
  moveRight: function(spaces) {
    var that = this
    if(this.currentPos + spaces > this.carouselCount) {
      return
    }
    this.currentPos += spaces
    var sl = $('.schedule-list')
    sl.animate(
      {left: parseFloat(sl.css('left')) - spaces * parseFloat(sl.parent().css('width')) + 'px' },
      null,
      null,
      that.updateBubble
    )
  },
  moveLeft: function(spaces) {
    var that = this
    if(this.currentPos - spaces < 1) {
      return
    }
    this.currentPos -= spaces
    var sl = $('.schedule-list')
    sl.animate(
      {left: parseFloat(sl.css('left')) + spaces * parseFloat(sl.parent().css('width')) + 'px' },
      null,
      null,
      that.updateBubble
    )
  },
  dotClick: function(e) {
    var clickedNum = parseFloat($(e.target).attr('id'))
    if(clickedNum !== this.currentPos) {
      var diff = clickedNum - this.currentPos
      if(diff > 0) {
        this.moveRight(diff)
      } else {
        this.moveLeft(-1 * diff)
      }
    }
  }
})