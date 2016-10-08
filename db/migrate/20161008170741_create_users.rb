class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :fname, null: false
      t.string :lname, null: false
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.string :avatar_url, default: "http://images.nationalgeographic.com/wpf/media-live/photos/000/924/overrides/machu-picchu-llama-unesco_92494_600x450.jpg"

      t.timestamps
    end
    add_index :users, :session_token, unique: true
    add_index :users, :username, unique: true
    add_index :users, :email, unique: true
  end
end
