class UsersController < ApplicationController
  before_action :set_element, only: [:show]

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
    @user = User.create(user_params)
    render json: @user
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

    def users_params
      params.require(:users).permit(:username, :first_name, :last_name)
    end
end
