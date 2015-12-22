Rails.application.routes.draw do

  root to: "static_pages#root"

  resources :users, only: [:new, :create, :destroy]
  resource :session, only: [:new, :destroy, :create]
  resources :dummys, only: [:index]

  namespace :api, defaults: { format: :json } do
    resources :follows, only: [:create, :index, :destroy]
    resources :pics, only: [:create, :destroy, :index, :show]
    resources :users, only: [:index, :show]
    resources :feed, only: [:index]
  end

end
