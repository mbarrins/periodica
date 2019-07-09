class UserQuizElementsController < ApplicationController
  before_action :set_history, only: [:show, :update, :destroy]

  # GET /user_quiz_elements
  def index
    if params[:user_id]
      @user_quiz_elements = UserQuizElement.find_by(user_id: params[:user_id])
    else
      @user_quiz_elements = UserQuizElement.all
    end

    render json: @user_quiz_elements
  end

  # GET /user_quiz_elements/1
  def show
    render json: @user_quiz_element
  end

  # POST /user_quiz_elements
  def create
    @user_quiz_element = UserQuizElement.new(user_quiz_element_params)
    if @user_quiz_element.save
      render json: @user_quiz_element, status: :created, location: @user_quiz_element
    else
      render json: @user_quiz_element.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /user_quiz_elements/1
  def update
    if @user_quiz_element.update(user_quiz_element_params)
      render json: @user_quiz_element
    else
      render json: @user_quiz_element.errors, status: :unprocessable_entity
    end
  end

  # DELETE /user_quiz_elements/1
  def destroy
    if @user_quiz_element
      UserQuizElement.destroy(@user_quiz_element.id)
      redirect_to element_path(@user_quiz_element.element), status: 303
    else
      render json: @user_quiz_element.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_history
      @user_quiz_element = UserQuizElement.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_quiz_element_params
      params.require(:user_quiz_element).permit(:user_id, :element_id)
    end
end