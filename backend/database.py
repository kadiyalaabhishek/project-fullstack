from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine


db_url="postgresql://postgres:Tamanna143@localhost:5432/fakestore-db"
engine= create_engine(db_url)
session=sessionmaker(autocommit=False,autoflush=False,bind=engine)


