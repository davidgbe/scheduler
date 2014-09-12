require 'soc_parser'

class HomeController < ApplicationController
  
  def index
  end

  def login
    parser = SocParser.new('usc')
  end

end
