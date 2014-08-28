class UsersController < ApplicationController
  respond_to :json
  
  def index
  end

  def create
    
  end

  def show
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
