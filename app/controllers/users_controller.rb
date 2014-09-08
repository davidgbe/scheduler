class UsersController < ApplicationController
  respond_to :json

  before_filter :require_user, except: [:create]
  
  def index
  end

  def create
    @new_user = User.find_or_create_by(user_params)
  end

  def show
    @current_user = User.find(params[:id])
  end

  def update
  end

  def destroy
  end

  private

  def user_params
    params.require(:user).permit(:user_name, :first_name, :last_name, :email, :password)
  end

end