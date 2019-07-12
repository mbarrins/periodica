Rails.application.routes.draw do
  resources :elements, only: [:show, :index]
  resources :classifications, only: [:index]
  resources :quiz_questions, only: [:update]
  resources :user_quiz_elements, only: [:create, :destroy]
  resources :user_questions, only: [:create, :destroy]
  resources :quizzes, only: [:show, :index, :create, :update]
  resources :users, only: [:index, :create, :update]
  resources :subjects, only: [:index, :show]

  root 'static#index'
  get '/', to: 'static#index'
  get '*other', to: 'static#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
