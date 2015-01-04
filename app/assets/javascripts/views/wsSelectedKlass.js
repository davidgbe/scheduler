Scheduler.Views.WSSelectedKlass = Backbone.View.extend({
  template: JST['workstation/selectedKlass'],
  events: {
    'mouseover': 'hovering',
    'mouseout': 'notHovering'
  },
  initialize: function(options) {
    this.model = options.model
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
  destroy: function() {
    this.undelegateEvents();
    this.$el.removeData().unbind(); 
    this.remove();  
    Backbone.View.prototype.remove.call(this);
  }
})