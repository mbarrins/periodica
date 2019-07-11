class QuizzesController < ApplicationController
  before_action :set_history, only: [:show, :update, :destroy]

  # GET /quizzes
  def index
    if params[:user_id]
      @quizzes = Quiz.where(user_id: params[:user_id])
    else
      @quizzes = Quiz.all
    end

    render json: @quizzes, each_serializer: QuizzesSerializer, incl_ques: params[:incl_ques]
  end

  # GET /quizzes/1
  def show
    render json: @quiz, include: :quiz_questions, serializer: QuizzesSerializer, incl_ques: params[:incl_ques]
  end

  # POST /quizzes
  def create
    user = User.find(params[:user_id])
    @quiz = Quiz.createWithQuestions(user, params[:ques_no])

    if @quiz.errors.empty?
      render json: @quiz, status: :created, location: @quiz, serializer: QuizzesSerializer, incl_ques: params[:incl_ques]
    else
      render json: @quiz.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /quizzes/1
  def update
    if params[:submit_quiz] == 'true'
      @quiz.score
      @quiz.status = 'completed'
      @quiz.save
      render json: @quiz, serializer: QuizzesSerializer, incl_ques: params[:incl_ques]
    else
      if @quiz.update(quiz_params)
        render json: @quiz, serializer: QuizzesSerializer, incl_ques: params[:incl_ques]
      else
        render json: @quiz.errors, status: :unprocessable_entity
      end
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