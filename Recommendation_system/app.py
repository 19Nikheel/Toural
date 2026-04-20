from fastapi import FastAPI
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
import py_eureka_client.eureka_client as eureka_client


app = FastAPI()

# 🔹 Load your dataset (use your cleaned df_new file if saved)
df_new = pd.read_csv("df_new.csv")

# 🔹 Recreate model (or load precomputed)
tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform(df_new['features'])
cosine_sim = cosine_similarity(tfidf_matrix)

# 🔹 Mapping
indices = pd.Series(df_new.index, index=df_new['property_name']).drop_duplicates()

# 🔹 Recommendation function
def recommend(hotel_name, top_n=5):
    hotel_name = hotel_name.lower()

    match = df_new[df_new['property_name'].str.lower() == hotel_name]

    if match.empty:
        return []

    idx = match.index[0]

    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    hotel_indices = []
    seen = set()

    for i, score in sim_scores:
        name = df_new.iloc[i]['property_name']
        if name.lower() != hotel_name and name not in seen:
            hotel_indices.append(i)
            seen.add(name)
        if len(hotel_indices) == top_n:
            break

    result = df_new[['uniq_id', 'property_name', 'city']].iloc[hotel_indices]
    return result.to_dict(orient="records")


# 🔹 Recommend within SAME CITY
def recommend_in_city(hotel_name, top_n=5):
    hotel_name = hotel_name.lower()

    match = df_new[df_new['property_name'].str.lower() == hotel_name]
    if match.empty:
        return []

    idx = match.index[0]
    target_city = df_new.iloc[idx]['city']

    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    hotel_indices = []
    seen = set()

    for i, score in sim_scores:
        row = df_new.iloc[i]
        name = row['property_name']

        if (
            row['city'] == target_city and
            name.lower() != hotel_name and
            name not in seen
        ):
            hotel_indices.append(i)
            seen.add(name)

        if len(hotel_indices) == top_n:
            break

    return df_new[['uniq_id','property_name','city']].iloc[hotel_indices].to_dict(orient="records")



    # 🔹 Recommend within SAME DISTRICT (using locality as proxy)
def recommend_in_district(hotel_name, top_n=5):
    hotel_name = hotel_name.lower()

    match = df_new[df_new['property_name'].str.lower() == hotel_name]
    if match.empty:
        return []

    idx = match.index[0]
    target_district = str(df_new.iloc[idx]['state']).lower()

    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    hotel_indices = []
    seen = set()

    for i, score in sim_scores:
        row = df_new.iloc[i]
        name = str(row['property_name'])

        if (
            str(row['state']).lower() == target_district and
            name.lower() != hotel_name and
            name not in seen
        ):
            hotel_indices.append(i)
            seen.add(name)

        if len(hotel_indices) == top_n:
            break

    return df_new[['uniq_id','property_name','city']].iloc[hotel_indices].to_dict(orient="records")


# 🔥 API endpoint
@app.get("/recommend")
def get_recommendation(hotel_name: str, top_n: int = 5):
    return recommend(hotel_name, top_n)

@app.get("/recommend/city")
def api_recommend_city(hotel_name: str, top_n: int = 5):
    return recommend_in_city(hotel_name, top_n)


@app.get("/recommend/district")
def api_recommend_district(hotel_name: str, top_n: int = 5):
    return recommend_in_district(hotel_name, top_n)

# Register with Eureka
@app.on_event("startup")
async def startup():
    await eureka_client.init_async(
        eureka_server="http://localhost:8761/eureka",
        app_name="fastapi-service",
        instance_port=8000,
    )

@app.on_event("shutdown")
async def shutdown():
    await eureka_client.stop_async()