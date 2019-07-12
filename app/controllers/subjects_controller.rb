class SubjectsController < ApplicationController
  # GET /subjects
  def index
    if params[:user_id]
      @subjects = Subject.all_with_user(params[:user_id]).sort_by{|subject| subject[:name]}
    else
      @subjects = Subject.all.sort_by{|subject| subject.name}
    end

    render json: @subjects
  end
end
