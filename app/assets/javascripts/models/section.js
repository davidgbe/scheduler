Scheduler.Models.Section = Backbone.Model.extend({
  initialize: function() {
  },
  urlRoot: '/sections',
  forMultiple: function(input, func) {
    if(input.indexOf('[') === -1) {
      return [
        func(input)
      ]
    } 
    var list = JSON.parse(input)
    var toReturn = []
    for(var i in list) {
      toReturn.push( func(list[i]) )
    }
    return toReturn
  },
  parsedTime: function(time) {
    timeInfo = {}
    if(time.charAt(0) === '0') {
      timeInfo.time = time.substring(1, time.length)
      timeInfo.pm = false
    } else if(time.charAt(0) === '1') {
      var second = parseFloat(time.substring(1, 2))
      if(second > 2) {
        timeInfo.time = (second - 2) + time.substring(2, time.length)
        timeInfo.pm = true
      } else {
        timeInfo.time = time
        if(second === 2) {
          timeInfo.pm = true
        } else {
          timeInfo.pm = false
        }
      }
    } else {
      timeInfo.time = time
    }
    return timeInfo
  },
  formattedTime: function(time) {
    var info = this.parsedTime(time)
    if(_.has(info, 'pm')) {
      if(info.pm) {
        return info.time + 'pm'
      } else {
        return info.time + 'am'
      } 
    } else {
      return info.time
    }
  },
  startAsReadableString: function() {
    var callback = _.bind(this.formattedTime, this)
    return this.forMultiple(this.get('start'), callback)
  },
  finishAsReadableString: function() {
    var callback = _.bind(this.formattedTime, this)
    return this.forMultiple(this.get('finish'), callback)
  },
  timeAsNum: function(time) {
    var parsed = this.parsedTime(time)
    var parsedTime = parsed.time
    if(parsedTime.indexOf(':') === -1) {
      parsed.time = -1
    } else if(parsedTime.length === 5) {
      var hour = parseFloat(parsedTime.substring(0,2))
      if(parsedTime.charAt(3) !== '0') {
        parsed.time = hour + (parseFloat(parsedTime.substring(3,4)) / 10)
      } else {
        parsed.time = hour
      }
    } else {
      var hour = parseFloat(parsedTime.substring(0,1))
      if(parsedTime.charAt(2) !== '0') {
        parsed.time = hour + (parseFloat(parsedTime.substring(2,3)) / 10)
      } else {
        parsed.time = hour
      }
    }
    return parsed
  },
  startAsNum: function() {
    var cb = _.bind(this.timeAsNum, this)
    return this.forMultiple(this.get('start'), cb)
  },
  finishAsNum: function() {
    var cb = _.bind(this.timeAsNum, this)
    return this.forMultiple(this.get('finish'), cb)
  },
  timeAsRoundedNum: function(time) {
    var toReturn = this.timeAsNum(time)
    var minutes = toReturn.time - Math.floor(toReturn.time)
    if(minutes <= .3 && minutes !== 0) {
      toReturn.time = Math.floor(toReturn.time) + .5
    } else if(minutes > .3) {
      toReturn.time = Math.floor(toReturn.time) + 1
      if(toReturn.time === 13) {
        toReturn.time = 1
      } else if(toReturn.time === 12) {
        toReturn.pm = !toReturn.pm
      }
    } 
    return toReturn
  },
  startAsRoundedNum: function() {
    var cb = _.bind(this.timeAsRoundedNum, this)
    return this.forMultiple(this.get('start'), cb)
  },
  finishAsRoundedNum: function() {
    var cb = _.bind(this.timeAsRoundedNum, this)
    return this.forMultiple(this.get('finish'), cb)
  },
  parsedDays: function() {
    return this.forMultiple(this.get('days'), function(x) { return x })
  }
})