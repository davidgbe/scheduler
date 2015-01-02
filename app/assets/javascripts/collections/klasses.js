Scheduler.Collections.Klasses = Backbone.Collection.extend({
  model: Scheduler.Models.Klass,
  parseSearch: function(results) {
    relevantModels = []
    for(var i in results) {
      var klassData = results[i].klass
      console.log(klassData)
      var model = this.get(klassData.id)
      if(model == null) {
        model = new Scheduler.Models.Klass
        this.updateKlassModel(model, klassData)
        this.push(model)
      }
      relevantModels.push(model)
    }
    return relevantModels
  },
  updateKlassModel: function(model, newData, setId) {
    var dataToSet = {
      corequisites: newData.corequisites,
      prerequisites: newData.prerequisites,
      description: newData.description,
      level: newData.level,
      subject: newData.subject
    }
    if(setId) {
      dataToSet.id = newData.id
    }
    model.set(dataToSet)
  }
});
