class ElementsController < ApplicationController
  before_action :set_element, only: [:show]

  # GET /elements
  def index
    if params[:user_id]
      @elements = Element.select_all(params[:user_id].to_i)
    else
      @elements = Element.cache_all
    end

    render json: @elements

  end

  # GET /elements/1
  def show
    render json: @element, serializer: ElementSerializer, user_id: params[:user_id]
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_element
      @element = Element.find(params[:id])
    end
end
