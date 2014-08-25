class SectionsController < ApplicationController
  respond_to :json
  
  def index
    @sections = Section.find(1)
  end

  def create
  end

  def show
  end

  def update
  end

  def destroy
  end
end
