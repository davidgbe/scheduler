class SchedulesController < ApplicationController
  respond_to :json

  before_filter :require_user
  
  def index
    @schedules = Schedule.find_by(user_id: session[:user_id])
  end

  def create
    @new_schedule = Schedule.create(user_id: session[:user_id])
  end

  def destroy
    if params[:id]
      @destroy_schedule = Schedule.find(params[:id])
      if @destroy_schedule
        @destroy_schedule.destroy
      end
    end
  end

end
