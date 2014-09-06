class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user

  def require_user
    return if current_user
  end

  def current_user 
    return @current_user if @current_user
    if session[:user_id]
      @current_user = User.find(session[:user_id]).first
    end
  end

  def create_user_session(user)
    session[:user_id] = user.id
  end

  def destroy_user_session
    session[:user_id] = nil
  end

end
