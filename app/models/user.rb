class User < ActiveRecord::Base

	attr_reader :password
	validates :username, length: {minimum: 4}
	validates_uniqueness_of :username, case_sensitive: false
	validates :password, length: {minimum: 6}, allow_nil: :true, confirmation: true

	validates :password_digest, :session_token, :fname, :lname, presence: true
	validates_uniqueness_of :email, case_sensitive: false
  validates :email, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, on: :create }

	after_initialize :ensure_session_token
	before_validation :ensure_session_token_uniqueness

	def password= password
		self.password_digest = BCrypt::Password.create(password)
		@password = password
	end

	def self.find_by_credentials(username, password)
		user = User.find_by(username: username)
		return nil unless user
		user.password_is?(password) ? user : nil
	end

	def password_is?(password)
		BCrypt::Password.new(self.password_digest).is_password?(password)
	end

	def reset_session_token!
		self.session_token = new_session_token
		ensure_session_token_uniqueness
		self.save
		self.session_token
	end

	private

	def ensure_session_token
		self.session_token ||= new_session_token
	end

	def new_session_token
		SecureRandom.base64
	end

	def ensure_session_token_uniqueness
		while User.find_by(session_token: self.session_token)
			self.session_token = new_session_token
		end
	end

end
