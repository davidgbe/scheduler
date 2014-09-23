require 'soc_parser_worker'

class HomeController < ApplicationController
  
  def index
  end

  def login
    if true
      parser = SocParserWorker.new('usc')
      parser.fetch_courses_data
    end
  end
end