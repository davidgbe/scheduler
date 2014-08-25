class KlassesController < ApplicationController
  respond_to :json

  def index
    if params[:search]
      @klasses = Klass.search do 
        fulltext params[:search]
      end
      @klasses = @klasses.results
    else 
      @klasses = Klass.all
    end
  end

  def create
    render json: Klass.find_or_create_by(params)
  end

  def show
    render json: params(:id)
  end

  def update

  end

  def destroy

  end
end
