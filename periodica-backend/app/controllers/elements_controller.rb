class ElementsController < ApplicationController
  before_action :set_element, only: [:show]

  # GET /elements
  def index
    @elements = Element.all

    render json: @elements, each_serializer: ElementSerializer, user_id: params[:user_id]

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
