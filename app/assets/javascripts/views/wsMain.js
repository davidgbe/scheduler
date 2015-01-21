Scheduler.Views.WSMain = Backbone.View.extend({
  template: JST['workstation/main'],
  events: {
    'click .search-tab': 'searchTabClick',
    'click .select-tab': 'selectTabClick',
    'click .search-bar-input': 'searchBarFirstClick',
    'keydown .search-bar-input': 'executeSearch',
    'mousedown .side-bar-inner': 'drag'
  },
  selected: [],
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
    $('.selected-classes').hide();
    $('.searched-classes').show();
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
    if($(e.target).hasClass('search-bar-input')) {
      return true
    }
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
        $(window).unbind('mousemove')
        that.dragging = false;
      }
    })
  },
  setCalendar: function(cal) {
    this.calendarView = cal
  },
  addSelected: function(searchedView) {
    var options = {
      model: searchedView.model,
      ws: this,
      schedule: this.schedule
    }
    if(_.has(searchedView, 'sections')) {
      options.sections = searchedView.sections
    }
    var selectedView = new Scheduler.Views.WSSelectedKlass(options)
    this.selected.push({
      searched: searchedView,
      selected: selectedView
    })
    searchedView.toggleOn()
    this.$el.find('.selected-classes').append(selectedView.render().el)
  },
  removeSelected: function(view) {
    for(var i = 0; i < this.selected.length; i++) {
      var child = this.selected[i]
      if(child.selected.model.get('id') === view.model.get('id')) {
        child.selected.destroy()
        child.searched.toggleOff()
        this.selected.splice(i, 1)
        if(i < this.selected.length && $('.select-tab').hasClass('selected-tab')) {
          this.selected[i].selected.hovering()
        }
        break
      }
    }
  }
})