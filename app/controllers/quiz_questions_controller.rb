class QuizQuestionsController < ApplicationController
  before_action :set_question, only: [:update]

  # PATCH/PUT /quiz_questions/1
  def update
    if @quiz_question.update(quiz_question_params)
      render json: @quiz_question, serializer: QuizQuestionsSerializer
    else
      render json: @quiz_question.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_question
      @quiz_question = QuizQuestion.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def quiz_question_params
      params.require(:quiz_question).permit(:user_answer)
    end
end