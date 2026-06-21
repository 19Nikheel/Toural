import pymongo
import psycopg2
from pymongo import MongoClient
import random

def sync_hotels():
    # Connect to MongoDB
    mongo_client = MongoClient("mongodb://localhost:27017/")
    mongo_db = mongo_client["Toural"]
    hotels_col = mongo_db["hotels"]

    # Connect to PostgreSQL
    pg_conn = psycopg2.connect(
        dbname="booking_service",
        user="postgres",
        password="Nik@9905366469",
        host="localhost",
        port="5432"
    )
    pg_cursor = pg_conn.cursor()

    hotels = hotels_col.find({})
    
    count_updated_sql = 0
    count_updated_mongo = 0

    for hotel in hotels:
        hotel_id = hotel.get("hotelId")
        if not hotel_id:
            continue
            
        single = hotel.get("singleRoom", 0) or 0
        double = hotel.get("doubleRoom", 0) or 0
        suite = hotel.get("suite", 0) or 0
        family = hotel.get("familyRoom", 0) or 0
        
        base_count = single + double + suite + family
        # Boost availability to be higher at starting (between 15 and 60 if base is low)
        available_count = max(base_count, random.randint(15, 60))
        
        # Random price from 1500 to 8500 in multiples of 100
        price = random.randint(15, 85) * 100.0
        
        # Update MongoDB with random price
        hotels_col.update_one({"_id": hotel["_id"]}, {"$set": {"price": price}})
        count_updated_mongo += 1
            
        # Update SQL since they were already inserted
        pg_cursor.execute(
            """
            UPDATE inventory_table 
            SET available_count = %s, price = %s, is_available = %s
            WHERE item_type = %s AND item_id = %s
            """,
            (available_count, float(price), True, 'HOTEL', str(hotel_id))
        )
        count_updated_sql += 1

    pg_conn.commit()
    pg_cursor.close()
    pg_conn.close()
    mongo_client.close()

    print(f"Migration correction completed!")
    print(f"Randomized prices and boosted availability for {count_updated_mongo} hotels in MongoDB.")
    print(f"Updated {count_updated_sql} hotels in PostgreSQL Inventory table.")

if __name__ == "__main__":
    sync_hotels()
