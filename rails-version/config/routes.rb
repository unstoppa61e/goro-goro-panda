Rails.application.routes.draw do
  root to: "stages#index"
  resources :stages, only: %i(show)
end
