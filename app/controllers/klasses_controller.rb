class KlassesController < ApplicationController
  respond_to :json

  def index
    if params[:search]
      @search = Klass.search do 
        fulltext params[:search].sub('+', ' ')
      end
      @klasses = @search.results
    else 
      @klasses = Klass.all
    end
  end

  def create
    @new_klass = Klass.find_or_create_by(klass_params)
  end

  def show
    @klass = Klass.find(params[:id])
  end

  def update
    
  end

  def destroy

  end

  private

  def klass_params
    params.require(:klass).permit(:subject, :level, :prerequisites, :corequisites, :description)
  end

end