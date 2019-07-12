Rails.application.routes.draw do
  resources :elements, only: [:show, :index]
  resources :classifications, only: [:index]
  resources :quiz_questions, only: [:update]
  resources :user_quiz_elements, only: [:show, :create, :delete]
  resources :user_questions, only: [:create, :delete]
  resources :quizzes, only: [:show, :index, :create, :update]
  resources :users, only: [:index, :create, :update]
  resources :subjects, only: [:index]

  get '*other', to: 'static#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
