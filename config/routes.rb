Rails.application.routes.draw do
  root to: "home#index"
  resources :stages, only: %i(show)
end
