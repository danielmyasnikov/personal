Rails.application.routes.draw do
  root controller: :static, action: 'public/index.html'

  namespace :api do
    resources :contacts, only: :create
  end
end
