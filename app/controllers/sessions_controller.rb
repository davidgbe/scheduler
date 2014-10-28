class SessionsController < ApplicationController

  respond_to :html, :json

  def create 
    @user = User.authenticate(params[:email], params[:password])
    if @user 
      create_user_session(@user)
    end
  end

  def destroy
    destroy_user_session
  end

end
