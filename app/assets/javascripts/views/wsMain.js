Scheduler.Views.WSMain = Backbone.View.extend({
  template: JST['workstation/main'],
  events: {
    'click .search-tab': 'searchTabClick',
    'click .select-tab': 'selectTabClick',
    'click .search-bar-input': 'searchBarFirstClick',
    'keydown .search-bar-input': 'executeSearch'
  },
  initialize: function(options) {
    this.el = options.el
    this.title = '#workstation'
    this.alreadyClicked = false
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
    console.log(window.location.host)
    var url = window.location.protocol + '//' + window.location.host + '/klasses?search=' + searchText.replace(/\s+/g, '+')
    $.get(url, function(data) {
      var relevantModels = Scheduler.klasses.parseSearch(data)
      that.populateSearchResults(relevantModels)
    })
  },
  populateSearchResults: function(models) {
    $('.search-results-inner').empty()
    for(var i in models) {
      var model = models[i]
      var searchedKlass = new Scheduler.Views.WSSearchedKlass({
        el: '.search-results-inner',
        model: model
      })
      searchedKlass.render()
    }
  }
})