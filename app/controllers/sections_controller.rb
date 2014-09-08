class SectionsController < ApplicationController
  respond_to :json
  
  def index
    @sections = Section.find(1)
  end

  def create
  end

  def show
    if params[:klass_id]
      @section = Section.find_by(klass_id: params[:klass_id])
    end
  end

  def update
  end

  def destroy
  end
end
