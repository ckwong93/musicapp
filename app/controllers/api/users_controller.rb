class Api::UsersController < ApplicationController
  def create

		@user = User.new(user_params)
		if @user.save
			login(@user)
			render "api/users/show"
		else
			render json: @user.errors.full_messages, status: 422
		end
	end

 def new
   @user = User.new
   render :new
 end

 def show
   @user = User.find(params[:id])
   render :show
 end

 def index
   @users = User.all
 end

 private
 def user_params
   params.require(:user).permit(:password, :username, :email, :fname, :lname)
 end
end
