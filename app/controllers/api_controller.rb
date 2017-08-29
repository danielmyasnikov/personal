class ApiController < ApplicationController
  rescue_from StandardError, with: :standard_resque

  skip_before_action :verify_authenticity_token

  def standard_resque(error)
    render json: { errors: { base: error.message } }, status: 500
  end

  def request_parameters
    params.except(:controller, :action)
  end

  def permitted_params
    # escape rails strong parameters hell
    request_parameters.permit!
  end
end
