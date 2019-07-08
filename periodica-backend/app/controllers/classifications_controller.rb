class ClassificationsController < ApplicationController
  before_action :set_classification, only: [:show]

  # GET /classifications
  def index
    @classifications = Classification.all

    render json: @classifications
  end

  # GET /classifications/1
  def show
    render json: @classification
  end

  # POST /classifications
  # def create
  #   @classification = Classification.new(classification_params)

  #   if @classification.save
  #     render json: @classification, status: :created, location: @classification
  #   else
  #     render json: @classification.errors, status: :unprocessable_entity
  #   end
  # end

  # # PATCH/PUT /classifications/1
  # def update
  #   if @classification.update(classification_params)
  #     render json: @classification
  #   else
  #     render json: @classification.errors, status: :unprocessable_entity
  #   end
  # end

  # # DELETE /classifications/1
  # def destroy
  #   @classification.destroy
  # end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_classification
      @classification = Classification.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def classification_params
      params.require(:classification).permit(:name, :description)
    end
end
