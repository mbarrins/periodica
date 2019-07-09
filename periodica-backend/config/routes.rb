Rails.application.routes.draw do
  resources :elements, only: [:show, :index]
  resources :classifications, only: [:show, :index]
  resources :quiz_questions
  resources :user_quiz_elements
  resources :quizzes, only: [:show, :index, :create, :update]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
