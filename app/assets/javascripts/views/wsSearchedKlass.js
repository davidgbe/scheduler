Scheduler.Views.WSSearchedKlass = Backbone.View.extend({
  template: JST['workstation/searchedKlass'],
  events: {
    
  },
  initialize: function(options) {
    this.el = options.el
    this.num = options.num
    this.model = options.klass
    if(_.has(options, 'sections')) {
      this.sections = options.sections
    } 
  },
  render: function() {
    var data = { 
      extraClass: 'searched-class-' + this.num,
      title: this.model.get('title'),
      prerequisites: this.model.get('prerequisites'),
      corequisites: this.model.get('corequisites'),
      description: this.model.get('description'),
      deptTitle: this.model.get('dept_title')
    }
    if(data.prerequisites == null) {
      data.prerequisites = 'None'
    }
    if(data.corequisites == null) {
      data.corequisites = 'None'
    }
    var compiled = this.template(data)
    this.$el.append(compiled)

    if(_.has(this, 'sections') && this.sections != null && this.sections != []) {
      this.createSections(this.sections)
    }
  },
  createSections: function() {
    for(var i in this.sections) {
      section = this.sections[i]
      var searchedSection = new Scheduler.Views.WSSearchedSection({
        el: '.searched-class-' + this.num,
        model: section
      })
      searchedSection.render()
    }
  }
})