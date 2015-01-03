Scheduler.Views.WSMain = Backbone.View.extend({
  template: JST['workstation/main'],
  events: {
    'click .search-tab': 'searchTabClick',
    'click .select-tab': 'selectTabClick',
    'click .search-bar-input': 'searchBarFirstClick',
    'keydown .search-bar-input': 'executeSearch',
    'mousedown .side-bar-inner': 'drag'
  },
  initialize: function(options) {
    this.el = options.el
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
    var calendarView = new Scheduler.Views.WSCalendar({ 
      el: this.el 
    })
    calendarView.render()
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
    console.log(window.location.host)
    var url = window.location.protocol + '//' + window.location.host + '/klasses?search=' + searchText.replace(/\s+/g, '+')
    $.get(url, function(data) {
      var relevantModels = Scheduler.klasses.parseSearch(data)
      console.log(relevantModels)
      that.populateSearchResults(relevantModels)
    })
  },
  populateSearchResults: function(relevantModels) {
    $('.search-results-inner').empty()
    for(var i in relevantModels) {
      var modelGroup = relevantModels[i]
      var searchedKlass = new Scheduler.Views.WSSearchedKlass({
        el: '.search-results-inner',
        klass: modelGroup.klass,
        sections: modelGroup.sections,
        num: i 
      })
      searchedKlass.render()
    }
    $('.searched-class').click(function(e) {
      var that = $(this)
      if(that.hasClass('searched-class-selected')) {
        that.removeClass('searched-class-selected')
      } else {
        that.addClass('searched-class-selected')
      }
    })
  },
  drag: function(e) {
    var that = this
    this.dragging = true;
    this.lastX = e.pageX

    $(window).mousemove(function(e) {
      e.preventDefault()
      var sideBar = $('.side-bar')
      var rightContainer = $('.right-container')
      var diff = e.pageX - this.lastX
      this.lastX = e.pageX
      
      if( (sideBar.width() !== 0 && diff < 0) || (rightContainer.width() !== 0 && diff > 0) ) {
        var maxWidth = sideBar.parent().width() - parseFloat(rightContainer.css('min-width'))
        var newWidth
        if(sideBar.width() + diff >= maxWidth) {
          newWidth = maxWidth + 'px'
        } else {
          newWidth = parseFloat(sideBar.css('width')) + diff + 'px'
        }
        sideBar.css('width', newWidth)
      }
    })

    $(window).mouseup(function(e){
      if(that.dragging) {
        $(window).unbind('mousemove');
        that.dragging = false;
      }
    })
  }
})