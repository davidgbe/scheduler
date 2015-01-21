Scheduler.Models.Schedule = Backbone.Model.extend({
  initialize: function() {
    this.sections = []
  },
  urlRoot: '/schedules',
  findAllSchedules: function() {
    var locked = []
    var unlocked = []
    for(var i in this.sections) {
      if(this.sections[i].klass.get('locked') === true) {
        locked.push(this.sections[i].klass)
      } else {
        unlocked.push(this.sections[i].klass)
      }
    }

  },
  schedule: function(sectionPackage) {
    if(sectionPackage.section != null) {
      if(this.canSchedule(sectionPackage.section)) {
        sectionPackage.section.set('remove', false)
        sectionPackage.section.set('rendered', false)
        this.sections.push(sectionPackage)
        return sectionPackage
      } else {
        alert('There is a conflict!')
        return null
      }
    } else {
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
      alert('This class doesn\'t fit anywhere!')
      return null
    }
  },
  unschedule: function(section) {
    section.set('remove', true)
  },
  removeSection: function(section) {
    for(var i in this.sections) {
      var existingSection = this.sections[i].section
      if(existingSection.get('id') === section.get('id')) {
        this.sections.splice(i, 1)
        break
      }
    }
  },
  canSchedule: function(section) {
    var newSectionVals = section.allValuesFlattened()
    for(var i in this.sections) {
      var scheduled = this.sections[i].section
      if(scheduled.get('id') === section.get('id')) {
        continue
      }
      var scheduledVals = scheduled.allValuesFlattened()
      if(!this.noConflict(newSectionVals, scheduledVals)) {
        return false
      }
    }
    return true
  },
  noConflict: function(firstSectionVals, secondSectionVals) {
    for(var j = 0; j < firstSectionVals.length; j++) {
      var newTime = firstSectionVals[j]
      for(var k = 0; k < secondSectionVals.length; k++) {
        var oldTime = secondSectionVals[k]
        if(newTime.day !== oldTime.day) {
          continue
        }
        if(!this.notOverlapping(newTime.start, oldTime.start, newTime.finish, oldTime.finish)) {
          return false
        }
      }
    }
    return true
  },
  notOverlapping: function(start1, start2, finish1, finish2) {
    if( (start1 < start2 && finish1 <= start2) || (start2 < start1 && finish2 <= start1) ) {
      return true
    }
    return false
  }
})