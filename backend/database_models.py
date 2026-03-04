from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column,Integer,String,Float

Base=declarative_base()
class Product(Base):
    __tablename__="product"


    id=Column(Integer,primary_key=True,index=True)
    title=Column(String)
    price=Column(Float)
    description=Column(String)
    category=Column(String)
    image=Column(String)
    # rating:Rating
    quantity=Column(Integer)