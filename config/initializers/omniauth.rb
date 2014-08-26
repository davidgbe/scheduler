OMNIAUTH_CONFIG = YAML.load_file("#{::Rails.root}/config/omniauth.yml")[::Rails.env]

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, OMNIAUTH_CONFIG['client_id'], OMNIAUTH_CONFIG['secret']
end