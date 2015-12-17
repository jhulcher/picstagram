Rails.application.routes.draw do

  root to: "sessions#new"

  resources :users, only: [:new, :create]
  resource :sessions, only: [:new, :create, :destroy]
  resources :dummys, only: [:index]

  namespace :api, defaults: { format: :json } do
    resources :follows, only: [:create, :index, :destroy]
    resources :pics, only: [:create, :destroy, :index, :show]

    resources :users, only: [:index] do
      resources :pics, only: [:index]
    end

    resources :feeds, only: [:index]

  end

end
