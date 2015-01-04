Scheduler.Views.WSCalendar = Backbone.View.extend({
  template: JST['workstation/calendar'],
  events: {
    'click .dot': 'dotClick',
    'click .right': 'rightOne',
    'click .left': 'leftOne'
  },
  initialize: function(options) {
    this.el = options.el
    this.carouselCount = options.count
    this.currentPos = 1
    this.shiftWidth = 700
    this.moving = false
    this.workStation = options.workStation
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

    var that = this
    $(window).resize(function() {
      that.doAllChangesForResize()
    })

    $(window).trigger('resize')
  },
  updateBubble: function() {
    $('.selected-dot').removeClass('selected-dot')
    $('.dot:nth-of-type(' + this.currentPos + ')').addClass('selected-dot')
    this.moving = false
  },
  moveRight: function(spaces) {
    var that = this
    if(this.currentPos + spaces > this.carouselCount) {
      this.moving = false
      return
    }
    this.currentPos += spaces
    var sl = $('.schedule-list')
    var callback = _.bind(this.updateBubble, this)
    sl.animate(
      {left: parseFloat(sl.css('left')) - spaces * parseFloat(sl.parent().css('width')) + 'px' },
      null,
      null,
      callback
    )
  },
  moveLeft: function(spaces) {
    var that = this
    if(this.currentPos - spaces < 1) {
      this.moving = false
      return
    }
    this.currentPos -= spaces
    var sl = $('.schedule-list')
    var callback = _.bind(this.updateBubble, this)
    sl.animate(
      {left: parseFloat(sl.css('left')) + spaces * parseFloat(sl.parent().css('width')) + 'px' },
      null,
      null,
      callback
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
  },
  rearrangeTopItems: function() {
    var titleContainer = $('.title-container')
    var tools = $('.tools')
    var tool = $('.tool')
    if(parseFloat($('.right-container').css('width')) < this.shiftWidth ) {
      titleContainer.css('display', 'table')
      tools.addClass('small-tools')
      tools.css('float', 'none')
      tool.css('margin-left', '35px')
      tool.css('margin-right', '35px')
    } else {
      titleContainer.css('display', 'inline-block')
      tools.removeClass('small-tools')
      tools.css('float', 'right')
      tool.css('margin-left', '5px')
      tool.css('margin-right', '5px')
    }
  },
  changeWeekdayNames: function() {
    var firstRow = $('tr:first-of-type');
    if($('.right-container').width() < this.shiftWidth) {
      firstRow.find('#Su').text('Su')
      firstRow.find('#M').text('M')
      firstRow.find('#T').text('T')
      firstRow.find('#W').text('W')
      firstRow.find('#Th').text('Th')
      firstRow.find('#F').text('F')
      firstRow.find('#Sa').text('Sa')
    } else {
      firstRow.find('#Su').text('Sunday')
      firstRow.find('#M').text('Monday')
      firstRow.find('#T').text('Tueday')
      firstRow.find('#W').text('Wednesday')
      firstRow.find('#Th').text('Thursday')
      firstRow.find('#F').text('Friday')
      firstRow.find('#Sa').text('Saturday')
    }
  },
  adjustContainer: function() {
    var sideBar = $('.side-bar')
    var rightContainer = $('.right-container')
    rightContainer.css('width', rightContainer.parent().width() - parseFloat(sideBar.css('width')))
    rightContainer.css('left', parseFloat(sideBar.css('width')))
  },
  adjustList: function() {
    var scheduleList = $('.schedule-list');
    scheduleList.css('height', parseFloat(scheduleList.parent().css('height')) - parseFloat($('.right-top').css('height')) - parseFloat($('.right-bottom').css('height')) + 'px')
    $('li').css('width', parseFloat(scheduleList.parent().css('width')) + 'px')
    scheduleList.css('left', -1 * (this.currentPos - 1) * $('.right-container').width())
  },
  doAllChangesForResize: function() {
    this.changeWeekdayNames()
    this.adjustContainer()
    this.rearrangeTopItems()
    this.adjustList()
  },
  rightOne: function() {
    if(!this.moving) {
      this.moving = true
      this.moveRight(1)
    }
  },
  leftOne: function() {
    if(!this.moving) {
      this.moving = true
      this.moveLeft(1)
    }
  }
})