from fastapi import FastAPI
from fastapi import Depends
import requests
from models import Product
from database import session
from database import engine
import database_models
# //import crosmiddleware
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# //payments razorpay
import razorpay
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
# ai chartboats Groq
# from fastapi import Request
from fastapi import APIRouter
from sqlalchemy.orm import Session
from groq import Groq
from database import session
from database_models import Product as DBProduct

app = FastAPI()

# --- ADD THIS SECTION ---
origins = [
    "http://localhost:5173",    # React Frontend
    "http://127.0.0.1:5173",    # Alternative Frontend URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,      # Allow these specific URLs
    allow_credentials=True,
    allow_methods=["*"],        # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],        # Allow all headers
)
# ------------------------

# ... (keep your existing routes below this line) ...

database_models.Base.metadata.create_all(bind=engine)

# 1. The 'try' block must be included, and all of this must be
# pushed all the way to the left (not inside any function)

# try:
#     response = requests.get("https://fakestoreapi.com/products")
#     products = response.json()
# except Exception as e:
#     products = []




def init_db():
    db = session()
    try:
        # 1. Fetch the data inside the function
        response = requests.get("https://fakestoreapi.com/products")
        products = response.json()

        # 2. Loop through the API data
        for product in products:
            
            # 3. Prevent duplicates: Check if the product ID already exists in your DB
            existing_product = db.query(database_models.Product).filter(database_models.Product.id == product['id']).first()
            
            if not existing_product:
                # 4. Map the API dictionary to your SQLAlchemy model precisely
                new_item = database_models.Product(
                    id=product['id'],
                    title=product['title'],
                    price=product['price'],
                    description=product['description'],
                    category=product['category'],
                    image=product['image'],
                    quantity=10  # Setting the default quantity since the API doesn't have one
                )
                db.add(new_item)
        
        # 5. Save everything to PostgreSQL
        db.commit()
        print("Successfully saved products to your PostgreSQL database!")
        
    except Exception as e:
        print(f"An error occurred: {e}")
        db.rollback() # Undoes changes if there is a crash
    finally:
        db.close()

# Run the function
init_db()

@app.get("/")
def greet():
    return "welcome abhi all the best buddy"

# @app.get("/products")
# def get_all_products():
#     # db=session()
#     # db.query()
#     return products

@app.get("/products")
def get_all_products():
    db = session() # Open the connection to Postgres
    try:
        # Fetch all rows from the Product table
        products = db.query(database_models.Product).all()
        return products
    finally:
        db.close() # Always close the connection when done!

# @app.get("/product/{id}")
# def get_product_by_id(id:int):
#     for product in products:
#         if product["id"] == id:
#             return product
#     return("product not found")


# @app.post("/product/{id}")
# def add_product(product:Product):
#     products.append(product)
#     return product

# @app.put("/product/{id}")
# def update_product(id:int,product:Product):
#     for i in range(len(products)):
#         if products[i]["id"] == id:
#            products[i]=product.model_dump()
#         return "product Updated succesfully"
#     return "No product found"

# @app.delete("/product/{id}")
# def delete_product(id:int):
#     for i in range(len(products)):
#         if products [i]["id"]==id:
#             # deleted_product=products.pop(i) or
#             del products[i]
#         return "product deleted"
#     return "product not found"



# //database Code
# READ (GET by ID)
@app.get("/product/{id}")
def get_product_by_id(id: int):
    db = session()
    try:
        # Ask PostgreSQL to find the row where the ID matches
        product = db.query(database_models.Product).filter(database_models.Product.id == id).first()
        if product:
            return product
        return {"message": "product not found"}
    finally:
        db.close()


# CREATE (POST)
# Note: I changed the route from "/product/{id}" to "/product". 
# When creating new items, the database generates the ID for you!
@app.post("/product")
def add_product(product: Product):
    db = session()
    try:
        # Map your incoming JSON data (Pydantic model) to your database model
        new_product = database_models.Product(
            title=product.title,
            price=product.price,
            description=product.description,
            category=product.category,
            image=product.image,
            quantity=product.quantity
        )
        db.add(new_product)
        db.commit()
        db.refresh(new_product) # This fetches the new ID created by PostgreSQL
        return new_product
    finally:
        db.close()


# UPDATE (PUT)
@app.put("/product/{id}")
def update_product(id: int, product: Product):
    db = session()
    try:
        # 1. Find the existing product in the database
        db_product = db.query(database_models.Product).filter(database_models.Product.id == id).first()
        if not db_product:
            return {"message": "No product found"}
        
        # 2. Update its columns with the new data
        db_product.title = product.title
        db_product.price = product.price
        db_product.description = product.description
        db_product.category = product.category
        db_product.image = product.image
        db_product.quantity = product.quantity
        
        # 3. Save the changes
        db.commit()
        return {"message": "product Updated succesfully"}
    finally:
        db.close()


# DELETE
@app.delete("/product/{id}")
def delete_product(id: int):
    db = session()
    try:
        # 1. Find the product
        db_product = db.query(database_models.Product).filter(database_models.Product.id == id).first()
        if not db_product:
            return {"message": "product not found"}
        
        # 2. Delete it from the database
        db.delete(db_product)
        db.commit()
        return {"message": "product deleted"}
    finally:
        db.close()


# razarpay
# ... your other imports ...

# 1. SETUP RAZORPAY (Replace with YOUR keys)
# You get these from https://dashboard.razorpay.com/app/keys
RAZORPAY_KEY_ID = "rzp_test_SKjarDZMBtinyq"
RAZORPAY_KEY_SECRET = "bSoTNWmzJ7xZhZDCm7dtkCjx"

client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))

class OrderRequest(BaseModel):
    amount: float # Accepts amount in Rupees (e.g., 242.20)

# 2. CREATE ORDER API
@app.post("/create-order")
async def create_order(request: OrderRequest):
    try:
        # Razorpay needs amount in "Paise" (1 Rupee = 100 Paise)
        amount_in_paise = int(request.amount * 100)
        
        data = {
            "amount": amount_in_paise,
            "currency": "INR",
            "receipt": "order_rcptid_11"
        }
        
        # Create order on Razorpay Server
        order = client.order.create(data=data)
        return order
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error creating order")

# 3. VERIFY PAYMENT API (Security Check)
@app.post("/verify-payment")
async def verify_payment(data: dict):
    try:
        # This checks if the payment is real or fake
        client.utility.verify_payment_signature(data)
        return {"status": "success", "message": "Payment Verified"}
    except razorpay.errors.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid Signature")



# # chartboat groq code
# 1. Initialize the Groq Client with your key
# (Security Note: In production, it's best to store this in a .env file!)
groq_client = Groq(api_key="your api key here")

# 2. Create a dependency to get the database session
def get_db():
    db = session()
    try:
        yield db
    finally:
        db.close()

# 3. Define what the incoming request from React looks like
class ChatMessage(BaseModel):
    message: str

# 4. Create the endpoint that React is trying to call
@app.post("/ask-ai")
async def ask_ai(chat_req: ChatMessage, db: Session = Depends(get_db)):
    try:
        # A. Fetch all products from your database
        products = db.query(DBProduct).all()
        
        # B. Format the products so the AI can read them easily
        product_context = "Here are the products currently available in our database:\n"
        for p in products:
            # We include title, price, and a short description
            product_context += f"- {p.title} (Category: {p.category}): ${p.price}. Description: {p.description[:100]}...\n"

        # C. Tell the AI how to behave (System Prompt)
        system_prompt = f"""
        You are a helpful, friendly AI shopping assistant for our e-commerce store.
        Use ONLY the following product catalog to answer the user's questions. 
        If a user asks about a product not on this list, politely inform them we don't carry it.
        Keep your answers conversational, brief, and helpful.
        
        {product_context}
        """

        # D. Call the Groq API (using the fast Llama 3 model)
        chat_completion = groq_client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": system_prompt,
                },
                {
                    "role": "user",
                    "content": chat_req.message,
                }
            ],
            model="llama-3.1-8b-instant", # You can also use "mixtral-8x7b-32768"
        )
        
        # E. Send the AI's response back to React
        ai_response = chat_completion.choices[0].message.content
        return {"reply": ai_response}

    except Exception as e:
        print(f"Groq API Error: {e}")
        raise HTTPException(status_code=500, detail="The AI is currently unavailable.")
