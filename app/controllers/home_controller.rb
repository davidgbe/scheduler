require 'soc_parser'

class HomeController < ApplicationController
  
  def index
  end

  def login
    parser = SocParser.new('usc')
    results = parser.fetch_courses_data
  end

end
