Scheduler.Models.Schedule = Backbone.Model.extend({
  initialize: function() {
    this.sections = []
  },
  urlRoot: '/schedules',
  schedule: function(sectionPackage) {
    console.log(sectionPackage)
    console.log('yyyy')
    if(sectionPackage.section != null) {
      console.log('here1')
      if(this.canSchedule(section)) {
        sectionPackage.section.set('remove', false)
        sectionPackage.section.set('rendered', false)
        this.sections.push(sectionPackage)
        return sectionPackage
      } else {
        alert('There is a conflict!')
        return null
      }
    } else {
      console.log('here')
      var klassSections = sectionPackage.klass.get('sections')
      for(var i in klassSections) {
        if(this.canSchedule(klassSections[i])) {
          var toReturn = {
            section: klassSections[i],
            klass: sectionPackage.klass
          }
          toReturn.section.set('remove', false)
          toReturn.section.set('rendered', false)
          this.sections.push(toReturn)
          return toReturn
        }
      }
      alert('this class doesn\'t fit anywhere!')
      return null
    }
  },
  unschedule: function(section) {
    section.set('remove', true)
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
          if(!this.notOverlapping(newTime.start, oldTime.finish, newTime.start, oldTime.finish)) {
            return false
          }
        }
      }
    }
    return true
  },
  notOverlapping: function(start1, start2, finish1, finish2) {
    if( (start1 > start2 && finish1 >= start2) || (start2 > start1 && finish2 >= start1) ) {
      return true
    }
    return false
  }
})