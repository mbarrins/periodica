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
