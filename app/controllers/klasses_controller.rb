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
    render json: Klass.find_or_create_by(params)
  end

  def show
    @klass = Klass.find(params[:id])
  end

  def update

  end

  def destroy

  end
end
