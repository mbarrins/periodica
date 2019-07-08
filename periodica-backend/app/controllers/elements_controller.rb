class ElementsController < ApplicationController
  before_action :set_element, only: [:show]

  # GET /elements
  def index
    @elements = Element.all

    render json: @elements, include: [{:user_quiz_elements => {only: [:user_id]}}, {:classification => {except: [:id, :created_at, :updated_at]}}]

  end

  # GET /elements/1
  def show
    render json: @element
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_element
      @element = Element.find(params[:id])
    end
end
