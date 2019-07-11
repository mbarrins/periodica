class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update]

  # GET /users
  def index
    if params[:username]
      @users = User.find_by(username: params[:username])
    else
      @users = User.all
    end

    render json: @users

  end

  # GET /users/1
  def show
    render json: @user
  end

  # POST /users
  def create
    user = User.create(user_params)

    if user.valid?
      render json: user
    else
      render json: {error: user.errors.full_messages, status: :could_not_create}
    end
  end

  # PATCH /users/1
  def update
    @user.update(user_params)
    @user.save
    render json: @user
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:username, :first_name, :last_name)
    end
end
