Scheduler.Collections.Klasses = Backbone.Collection.extend({
  model: Scheduler.Models.Klass,
  parseSearch: function(results) {
    relevantModels = []
    for(var i in results) {
      var klassData = results[i].klass
      var model = this.get(klassData.id)
      if(model == null) {
        model = new Scheduler.Models.Klass
        this.push(model)
      }
      var sections = Scheduler.sections.parseSections(klassData['sections'])
      klassData['sections'] = sections
      model.set(klassData)
      sections.map(function(s) {
        s.set('parent', model)
      })
      relevantModels.push({
        klass: model,
        sections: sections
      })
    }
    return relevantModels
  }
})
