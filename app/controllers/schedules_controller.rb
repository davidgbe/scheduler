class SchedulesController < ApplicationController
  respond_to :json

  before_filter :require_user
  
  def index
    @schedules = Schedule.find(1)
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
