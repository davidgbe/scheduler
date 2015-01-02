Scheduler.Collections.Sections = Backbone.Collection.extend({
  model: Scheduler.Models.Section,
  parseSections: function(sections, klass_id) {
    sectionModels = []
    for(var i in sections) {
      var section = sections[i]['section']
      var model = this.get(section.id)
      if(model == null) {
        model = new Scheduler.Models.Section
        this.push(model)
      }
      section.klass_id = klass_id
      model.set(section)
      sectionModels.push(model)
    }
    return sectionModels
  }
})
