Scheduler.Views.WSSelectedKlass = Backbone.View.extend({
  template: JST['workstation/selectedKlass'],
  events: {
    'mouseover .side-bar-item': 'hovering',
    'mouseout .side-bar-item': 'notHovering',
    'click .close': 'closeClick',
    'click .expand': 'toggleExpand',
    'click .side-bar-item': 'selectKlass'
  },
  initialize: function(options) {
    this.model = options.model
    this.workStation = options.ws
    if(_.has(options, 'sections')) {
      this.sections = options.sections
    }
    this.children = []
    this.schedule = options.schedule
    this.selected = null
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
    this.removeSections()
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
        that.removeSections()
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
      var sectionView = new Scheduler.Views.WSSelectedSection({
        model: this.sections[i],
        schedule: this.schedule,
        parent: this
      })
      this.children.push(sectionView)
      this.$el.find('.section-container').append(sectionView.render().el)
    }
  },
  removeSections: function() {
    for(var i in this.children) {
      this.children[i].destroy()
    }
    this.children = []
  },
  toggleSelect: function() {
    var that = this.$el.find('.side-bar-item')
    if(that.hasClass('selected')) {
      that.removeClass('selected')
      that.css('border-color', '#4ad0ff')
    } else {
      that.addClass('selected')
      that.css('border-color', '#0050a8')
    }
  },
  selectKlass: function() {
    this.selectSection(null)
  },
  selectSection: function(section) {
    if(this.selected == null) {
      if(section == null) {
        var newSelected = (this.sections.length !== 0) ? this.sections[0] : null
        if(newSelected != null) {
          this.selected = newSelected
          this.selected.set('remove', false)
          this.selected.set('rendered', false)
          this.schedule.sections.push({
            section: this.selected,
            klass: this.model
          })
          this.toggleSelect()
          this.schedule.trigger('change')
        }
      } else {
        this.selected = section
        this.selected.set('remove', false)
        this.selected.set('rendered', false)
        this.schedule.sections.push({
          section: this.selected,
          klass: this.model
        })
        this.toggleSelect()
        this.schedule.trigger('change')
      }
    } else {
      if(section == null) {
        this.selected.set('remove', true)
        this.selected = null
        this.toggleSelect()
      } else if(section.get('id') === this.selected.get('id')) {
        this.selected.set('remove', true)
        this.selected = null
        this.toggleSelect()
      } else {
        this.selected.set('remove', true)
        this.schedule.trigger('change')
        this.selected = section
        this.selected.set('remove', false)
        this.selected.set('rendered', false)
        this.schedule.sections.push({
          section: this.selected,
          klass: this.model
        })
      }
      this.schedule.trigger('change')
    }
  } 
})