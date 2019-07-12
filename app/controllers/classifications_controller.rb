class ClassificationsController < ApplicationController
  # GET /classifications
  def index
    @classifications = Classification.all

    render json: @classifications
  end
end
