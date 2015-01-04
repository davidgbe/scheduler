Scheduler.Views.WSSearchedKlass = Backbone.View.extend({
  template: JST['workstation/searchedKlass'],
  events: {
    'click .searched-class': 'clicked'
  },
  initialize: function(options) {
    this.model = options.klass
    if(_.has(options, 'sections')) {
      this.sections = options.sections
    }
  },
  render: function() {
    var data = { 
      title: this.model.get('title'),
      prerequisites: this.model.get('prerequisites'),
      corequisites: this.model.get('corequisites'),
      description: this.model.get('description'),
      deptTitle: this.model.get('dept_title')
    }
    if(data.prerequisites == null || data.prerequisites == {}) {
      data.prerequisites = 'None'
    }
    if(data.corequisites == null || data.corequisites == {}) {
      data.corequisites = 'None'
    }
    var compiled = this.template(data)
    this.$el.append(compiled) 
    if(_.has(this, 'sections') && this.sections != null && this.sections != []) {
      this.createSections(this.sections)
    }
    return this
  },
  createSections: function() {
    var sectionsArea = this.$el.find('div')
    for(var i in this.sections) {
      section = this.sections[i]
      var searchedSection = new Scheduler.Views.WSSearchedSection({
        model: section
      })
      sectionsArea.append(searchedSection.render().el)
    }
  },
  clicked: function(e) {
    var that = this.$el.find('.searched-class')
    if(that.hasClass('searched-class-selected')) {
      that.removeClass('searched-class-selected')
    } else {
      that.addClass('searched-class-selected')
    }
  }
})