Scheduler.Views.WSSelectedKlass = Backbone.View.extend({
  template: JST['workstation/selectedKlass'],
  events: {
    'mouseover .side-bar-item': 'hovering',
    'mouseout .side-bar-item': 'notHovering',
    'click .close': 'closeClick',
    'click .expand': 'toggleExpand'
  },
  initialize: function(options) {
    console.log('here')
    this.model = options.model
    this.workStation = options.ws
    if(_.has(options, 'sections')) {
      this.sections = options.sections
    }
  },
  render: function() {
    var data = { 
      // extraClass: 'searched-class-div-' + this.num,
      // title: this.model.get('title'),
      // prerequisites: this.model.get('prerequisites'),
      // corequisites: this.model.get('corequisites'),
      // description: this.model.get('description'),
      deptTitle: this.model.get('dept_title')
    }
    // if(data.prerequisites == null || data.prerequisites == {}) {
    //   data.prerequisites = 'None'
    // }
    // if(data.corequisites == null || data.corequisites == {}) {
    //   data.corequisites = 'None'
    // }

    var compiled = this.template(data)
    this.$el.append(compiled)
    return this
  },
  setAppropriateBorderColor: function(that, selected, unselected) {
    var color
    if(that.hasClass('selected')) {
      color = selected
    } else {
      color = unselected
    }
    that.css('border-color', color)
  },
  hovering: function() {
    this.setAppropriateBorderColor(this.$el.find('.side-bar-item'), '#0050a8', '#4ad0ff')
  },
  notHovering: function() {
    this.setAppropriateBorderColor(this.$el.find('.side-bar-item'), '#4ad0ff', 'white')
  },
  closeClick: function() {
    this.workStation.removeSelected(this)
  },
  destroy: function() {
    this.undelegateEvents()
    this.$el.removeData().unbind()
    this.remove()
    Backbone.View.prototype.remove.call(this)
  },
  toggleExpand: function() {
    if(this.$el.hasClass('expanded')) {
      this.$el.find('.expand').html('>')
      this.$el.removeClass('expanded')
      var that = this
      this.$el.find('.sections-outline').animate({height: '0px'}, {complete: function() {
        that.$el.find('.sections-outline').remove()
      }})
    } else {
      this.$el.addClass('expanded')
      this.$el.find('.expand').html('v')
      this.renderSections()
      this.$el.find('.sections-outline').animate({height: '140px'})
    }
    return false;
  },
  renderSections: function() {
    if(!_.has(this, 'sections')) { return }
    for(var i in this.sections) {
      var sectionView = new Scheduler.Views.WSSearchedSection({
        model: this.sections[i]
      })
      this.$el.find('.section-container').append(sectionView.render().el)
    }
  }
})