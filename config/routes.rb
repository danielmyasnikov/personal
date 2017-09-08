Rails.application.routes.draw do
  root controller: :static, action: 'public/index.html'

  get 'blog',            controller: :static, action: 'blog.html'
  get 'blog/85-article', controller: :static, action: 'blog/85-article.html'

  get "/ffa" => redirect("/thank-you/fine-food-australia.html")

  namespace :api do
    resources :contacts, only: :create
  end
end
