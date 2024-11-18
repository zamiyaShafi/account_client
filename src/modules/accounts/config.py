class Config:
    SECRET_KEY = 'yoursecretkey'
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://username:password@localhost/db_name'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    UPLOAD_FOLDER = 'uploads/'
    ALLOWED_EXTENSIONS = {'mp4', 'avi', 'mov', 'mkv'}
