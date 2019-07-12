class UserQuestionsController < ApplicationController
  before_action :set_history, only: [:destroy]

  # POST /user_questions
  def create
    @user_question = UserQuestion.new(user_question_params)

    if @user_question.save
      render json: @user_question, status: :created, location: @user_question
    else
      render json: {errors: @user_question.errors.full_messages, status: :unprocessable_entity}
    end
  end

   # DELETE /user_questions/1
   def destroy
    if @user_question
      UserQuestion.destroy(@user_question.id)
      render json: {message: true}
    else
      render json: {errors: @user_quiz_element.errors.full_messages, status: :unprocessable_entity}
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_history
      @user_question = UserQuestion.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_question_params
      params.require(:user_question).permit(:user_id, :subject_id)
    end
end