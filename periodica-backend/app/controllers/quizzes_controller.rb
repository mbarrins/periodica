class QuizzesController < ApplicationController
  before_action :set_history, only: [:show, :update, :destroy]

  # GET /quizzes
  def index
    if params[:user_id]
      @quizzes = Quiz.find_by(user_id: params[:user_id])
    else
      @quizzes = Quiz.all
    end

    render json: @quizzes, include: :quiz_questions, each_serializer: QuizzesSerializer
  end

  # GET /quizzes/1
  def show
    render json: @quiz, include: :quiz_questions, serializer: QuizzesSerializer
  end

  # POST /quizzes
  def create
    @quiz = Quiz.new(user_quiz_element_params)
    if @quiz.save
      render json: @quiz, status: :created, location: @quiz
    else
      render json: @quiz.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /quizzes/1
  def update
    if @quiz.update(user_quiz_element_params)
      render json: @quiz
    else
      render json: @quiz.errors, status: :unprocessable_entity
    end
  end

  # DELETE /quizzes/1
  def destroy
    if @quiz
      Quiz.destroy(@quiz.id)
      
    else
      render json: @quiz.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_history
      @quiz = Quiz.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def quiz_params
      params.require(:quiz).permit(:user_id, :status)
    end
end