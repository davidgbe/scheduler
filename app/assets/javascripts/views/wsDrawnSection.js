Scheduler.Views.WSDrawnSection = function(section, schedule) {
  var content = {
    model: section,
    drawnTimes: [],
    render: function() {
      var daysList = this.model.parsedDays()
      var starts = this.model.startAsRoundedNum()
      var finishes = this.model.finishAsRoundedNum()
      for(var i in daysList{ 
        var drawnTime = Scehduler.Views.WSDrawnSectionTime({
          start: starts[i],
          finish: finishes[i],
          days: daysList[i],
          schedule: schedule,
          parent: this 
        })
        this.drawnTimes.push(drawnTime)
      }
      for(var j in this.drawnTimes) {
        this.drawnTimes[j].render()
      }
    }
  }
  return content
}