class ElementsController < ApplicationController
  # GET /elements
  def index
    if params[:user_id]
      @elements = Element.select_all(params[:user_id].to_i)
    else
      @elements = Element.cache_all
    end

    render json: @elements
  end
end
