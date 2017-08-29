module Api
  class ContactsController < ApiController
    def create
      @contact = Contact.new(permitted_params)
      if @contact.save
        render json: @contact, status: 201
      else
        render json: { errors: @contact.errors }, status: 422
      end
    end
  end
end
