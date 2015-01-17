Scheduler.Models.Schedule = Backbone.Model.extend({
  initialize: function() {
    this.sections = []
  },
  urlRoot: '/schedules',
  schedule: function(sectionPackage) {
    if(sectionPackage.section) {
      if(canSchedule(section)) {
        this.sections.push(sectionPackage)
      } else {
        alert('There is a conflict!')
      }
    } else {
      var klassSections = sectionPackage.klass.get('sections')
      for(var i in klassSections) {
        if(canSchedule(klassSections[i])) {
          this.sections.push({
            section: klassSections[i],
            klass: sectionPackage.klass
          })
          break
        }
      }
    }
  },
  unschedule: function(section) {
    
  },
  canSchedule: function(section) {
    var newSectionVals = section.allValuesFlattened()
    for(var i in this.sections) {
      var scheduled = this.sections[i].section
      var scheduledVals = scheduled.allValuesFlattened()
      for(var j = 0; j < newSectionVals.length; j++) {
        var newTime = newSectionVals[j]
        for(var k = 0; k < scheduledVals.length; k++) {
          var oldTime = scheduledVals[k]
          if(newTime.day !== oldTime.day) {
            continue
          }
          if(!notOverlapping(newTime.start, oldTime.finish, newTime.start, oldTime.finish)) {
            return false
          }
        }
      }
    }
    return true
  },
  notOverlapping: function(start1, start2, finish1, finish2) {
    if( (start1 >= start2 && finish1 >= start2) || (start2 >= start1 && finish2 >= start1) ) {
      return true
    }
    return false
  }
})