class QuizQuestionsController < ApplicationController
  before_action :set_history, only: [:show, :update, :destroy]

  # GET /quiz_questions
  def index
    if params[:quiz_id]
      @quiz_questions = QuizQuestion.where(quiz_id: params[:quiz_id])
    else
      @quiz_questions = QuizQuestion.all
    end

    render json: @quiz_questions, each_serializer: QuizQuestionsSerializer
  end

  # GET /quiz_questions/1
  def show
    render json: @quiz_question, serializer: QuizQuestionsSerializer
  end

  # PATCH/PUT /quiz_questions/1
  def update
    if @quiz_question.update(quiz_question_params)
      render json: @quiz_question
    else
      render json: @quiz_question.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_history
      @quiz_question = QuizQuestion.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def quiz_question_params
      params.require(:quiz_question).permit(:user_answer)
    end
end