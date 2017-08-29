class Contact < ApplicationRecord
  validates_presence_of :fullname, :email
end
