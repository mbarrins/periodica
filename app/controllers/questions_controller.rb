class QuestionsController < ApplicationController
  # GET /questions
  def index
    if params[:types]
      @questions = Question.all.map{|question| question.quiz_field}.uniq
    else
      @questions = Question.all
    end

    render json: @questions
  end
end
