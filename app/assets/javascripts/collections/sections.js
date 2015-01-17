Scheduler.Collections.Sections = Backbone.Collection.extend({
  model: Scheduler.Models.Section,
  parseSections: function(sections) {
    sectionModels = []
    for(var i in sections) {
      var section = sections[i]['section']
      var model = this.get(section.id)
      if(model == null) {
        model = new Scheduler.Models.Section
        this.push(model)
      }
      if(section.teachers !== null && section.teachers.length > 0) {
        for(var i in section.teachers) {
          section.teachers[i] = section.teachers[i]['teacher']
        }
      } else {
        console.log(section)
      }
      model.set(section)
      model.setParsedValues()
      sectionModels.push(model)
    }
    return sectionModels
  }
})
