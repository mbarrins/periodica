class ElementsController < ApplicationController
  before_action :set_element, only: [:show, :update, :destroy]

  # GET /elements
  def index
    @elements = Element.all

    render json: @elements, include: [{:classification => {except: [:id, :created_at, :updated_at]}}]
  end

  # GET /elements/1
  def show
    render json: @element
  end

  # POST /elements
  def create
    @element = Element.new(element_params)

    if @element.save
      render json: @element, status: :created, location: @element
    else
      render json: @element.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /elements/1
  def update
    if @element.update(element_params)
      render json: @element
    else
      render json: @element.errors, status: :unprocessable_entity
    end
  end

  # DELETE /elements/1
  def destroy
    @element.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_element
      @element = Element.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def element_params
      params.require(:element).permit(:name, :symbol, :atomicNumber, :atomicMass, :classification_id, :color, :meltingPoint, :boilingPoint, :electronegativity, :discovered)
    end
end
