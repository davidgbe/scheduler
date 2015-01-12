Scheduler.Views.WSDrawnSection = function(section, schedule) {
  var content = {
    model: section,
    schedule: schedule,
    drawnTimes: [],
    render: function() {
      var daysList = this.model.parsedDays()
      var starts = this.model.startAsRoundedNum()
      var finishes = this.model.finishAsRoundedNum()
      for(var i in daysList) { 
        var len = daysList[i].length
        if(len > 1) {
          for(var j = 0; j < len; j++) {
            this.createDrawnSectionTime(starts[i], finishes[i], daysList[i].substring(j, j+1), this.schedule, this)
          }
        } else if (len=== 1) {
          this.createDrawnSectionTime(starts[i], finishes[i], daysList[i], this.schedule, this)
        }
      }
      console.log('in ds render')
      for(var j in this.drawnTimes) {
        this.drawnTimes[j].render()
      }
    },
    createDrawnSectionTime: function(start, finish, day, schedule, parent) {
      console.log('in ds create')
      var drawnTime = new Scheduler.Views.WSDrawnSectionTime({
        start: start,
        finish: finish,
        day: day,
        schedule: schedule,
        parent: parent 
      })
      console.log('in ds create')
      this.drawnTimes.push(drawnTime)
    }
  }
  return content
}