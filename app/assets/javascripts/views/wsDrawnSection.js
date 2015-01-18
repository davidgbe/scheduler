Scheduler.Views.WSDrawnSection = function(section, schedule, klass) {
  var content = {
    model: section,
    schedule: schedule,
    klass: klass,
    drawnTimes: [],
    initialize: function() {
      this.model.on('change', this.destroy, this)
      this.destroyed = false
    },
    render: function() {
      var daysList = this.model.get('parsedDaysList')
      var starts = this.model.get('startNum')
      var finishes = this.model.get('finishNum')
      for(var i in daysList) { 
        var len = daysList[i].length
        if(len > 1) {
          for(var j = len - 1; j >= 0; j--) {
            this.createDrawnSectionTime(starts[i], finishes[i], daysList[i].substring(j, j+1), this.schedule, this)
          }
        } else if (len === 1) {
          this.createDrawnSectionTime(starts[i], finishes[i], daysList[i], this.schedule, this)
        }
      }
      for(var j in this.drawnTimes) {
        this.drawnTimes[j].render()
      }
    },
    createDrawnSectionTime: function(start, finish, day, schedule, parent) {
      var drawnTime = new Scheduler.Views.WSDrawnSectionTime({
        start: start,
        finish: finish,
        day: day,
        schedule: schedule,
        parent: parent 
      })
      this.drawnTimes.push(drawnTime)
    },
    destroy: function() {
      if(this.model.get('remove') === false || this.destroyed === true) {
        return
      }
      this.destroyed = true
      for(var i = this.drawnTimes.length - 1; i >= 0; i--) {
        this.drawnTimes[i].destroy()
      }
      console.log(this.schedule)
      this.schedule.schedule.removeSection(this.model)
    }
  }
  content.initialize()
  return content
}