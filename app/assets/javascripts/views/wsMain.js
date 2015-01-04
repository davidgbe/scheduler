Scheduler.Views.WSMain = Backbone.View.extend({
  template: JST['workstation/main'],
  events: {
    'click .search-tab': 'searchTabClick',
    'click .select-tab': 'selectTabClick',
    'click .search-bar-input': 'searchBarFirstClick',
    'keydown .search-bar-input': 'executeSearch',
    'mousedown .side-bar-inner': 'drag'
  },
  children: [],
  searchedChildren: [],
  selectedChildren: [],
  selectedKlasses: [],
  initialize: function(options) {
    this.el = options.el
    this.schedule = options.schedule
    this.title = '#workstation'
    this.alreadyClicked = false
    this.dragging = false
    this.lastX = null
  },
  render: function() {
    var compiled = this.template({})
    this.$el.append(compiled)
    $('.searched-classes').hide();
    $('.selected-classes').show();
  },
  searchTabClick: function() {
    var thisTab = $('.search-tab') 
    if(thisTab.hasClass('selected-tab')) {
      return
    } 
    $('.selected-tab').removeClass('selected-tab')
    $('.selected-classes').hide()
    $('.searched-classes').show()
    thisTab.addClass('selected-tab')
  },
  selectTabClick: function() {
    var thisTab = $('.select-tab') 
    if(thisTab.hasClass('selected-tab')) {
      return
    } 
    $('.selected-tab').removeClass('selected-tab')
    $('.searched-classes').hide()
    $('.selected-classes').show()
    thisTab.addClass('selected-tab')
  },
  searchBarFirstClick: function() {
    if(!this.alreadyClicked) {
      $('.search-bar-input').val('')
      this.alreadyClicked = true
    }
  },
  executeSearch: function(e) {
    if(e.keyCode !== 13) {
      return true
    }
    var searchParams = $('.search-bar-input').val()
    if(searchParams !== '') {
      this.search(searchParams)
    }
    return false
  },
  search: function(searchText) {
    var that = this
    var url = window.location.protocol + '//' + window.location.host + '/klasses?search=' + searchText.replace(/\s+/g, '+')
    $.get(url, function(data) {
      var relevantModels = Scheduler.klasses.parseSearch(data)
      that.populateSearchResults(relevantModels)
    })
  },
  populateSearchResults: function(relevantModels) {
    var resultsArea = $('.search-results-inner')
    resultsArea.empty()
    for(var i in relevantModels) {
      var modelGroup = relevantModels[i]
      var searchedKlass = new Scheduler.Views.WSSearchedKlass({
        klass: modelGroup.klass,
        sections: modelGroup.sections,
        parent: this
      })
      resultsArea.append(searchedKlass.render().el)
    }
  },
  drag: function(e) {
    var that = this
    this.dragging = true
    this.lastX = e.pageX

    $(window).mousemove(function(e) {
      e.preventDefault()
      var sideBar = $('.side-bar')
      var rightContainer = $('.right-container')
      var diff = e.pageX - that.lastX

      if( (sideBar.width() !== 0 && diff < 0) || (rightContainer.width() !== 0 && diff > 0) ) {
        that.lastX = e.pageX
        var maxWidth = sideBar.parent().width() - parseFloat(rightContainer.css('min-width'))
        var newWidth
        if(sideBar.width() + diff >= maxWidth) {
          newWidth = maxWidth + 'px'
        } else {
          newWidth = parseFloat(sideBar.css('width')) + diff + 'px'
        }
        sideBar.css('width', newWidth)

        that.calendarView.doAllChangesForResize()
      }
    })

    $(window).mouseup(function(e){
      if(that.dragging) {
        $(window).unbind('mousemove');
        that.dragging = false;
      }
    })
  },
  setCalendar: function(cal) {
    this.calendarView = cal
  },
  addSelected: function(selected) {
    this.selectedKlasses.push(selected)
    var selectedKlass = new Scheduler.Views.WSSelectedKlass({
      model: selected
    })
    this.selectedChildren.push(selectedKlass)
    this.$el.find('.selected-classes').append(selectedKlass.render().el)
  },
  removeSelected: function(unselected) {
    var toDelete
    for(var i = 0; i < this.selectedKlasses.length; i++) {
      var child = this.selectedKlasses[i];
      if(child.id === unselected.id) {
        toDelete = child.id
        this.selectedKlasses.splice(i, 1);
        break
      }
    }
    for(var j = 0; j < this.selectedChildren.length; j++) {
      var child = this.selectedChildren[j];
      if(child.model.id === toDelete) {
        child.destroy()
        this.selectedChildren.splice(j, 1);
        break
      }
    }
  }
})