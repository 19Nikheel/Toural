from fastapi import FastAPI
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
import py_eureka_client.eureka_client as eureka_client


app = FastAPI()

# 🔹 Load your dataset (use your cleaned df_new file if saved)
df_new = pd.read_csv("df_new.csv")

df_places = pd.read_csv("df.csv")

# 🔹 Recreate model (or load precomputed)
tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform(df_new['features'])
cosine_sim = cosine_similarity(tfidf_matrix)

# 🔹 Mapping
indices = pd.Series(df_new.index, index=df_new['property_name']).drop_duplicates()




name_to_index_places = {
    name.lower(): i for i, name in enumerate(df_places["name"])
}

df_places.columns = df_places.columns.str.strip().str.lower().str.replace(" ", "_")

df_places["features"] = (
    df_places["type"].astype(str) + " " +
    df_places["significance"].astype(str) + " " +
    df_places["best_time_to_visit"].astype(str)
)

tfidf_matrix_places = tfidf.fit_transform(df_places["features"])

cosine_sim_places = cosine_similarity(tfidf_matrix_places)

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


 # 🔹 Recommend 
def recommend_place(place_name, top_n=5):
    idx = name_to_index_places.get(place_name.lower())
    if idx is None:
        return []

    sim_scores = sorted(
        list(enumerate(cosine_sim_places[idx])),
        key=lambda x: x[1],
        reverse=True
    )

    results, seen = [], set()

    for i, _ in sim_scores:
        row = df_places.iloc[i]
        name = row["name"]

        if name.lower() != place_name.lower() and name not in seen:
            results.append({
                "uniq_id": int(row["uniq_id"]), 
                "name": name,
                "city": row["city"],
                "state": row["state"]
            })
            seen.add(name)

        if len(results) == top_n:
            break

    return results


# 🔹 Recommend within SAME CITY
def recommend_place_in_city(place_name, top_n=5):
    idx = name_to_index_places.get(place_name.lower())
    if idx is None:
        return []

    target_city = df_places.iloc[idx]["city"]

    sim_scores = sorted(
        list(enumerate(cosine_sim_places[idx])),
        key=lambda x: x[1],
        reverse=True
    )

    results, seen = [], set()

    for i, _ in sim_scores:
        row = df_places.iloc[i]
        name = row["name"]

        if (
            row["city"] == target_city and
            name.lower() != place_name.lower() and
            name not in seen
        ):
            results.append({
                "uniq_id": int(row["uniq_id"]), 
                "name": name,
                "city": row["city"],
                "state": row["state"]
            })
            seen.add(name)

        if len(results) == top_n:
            break

    return results


# 🔹 Recommend within SAME state

def recommend_place_in_state(place_name, top_n=5):
    idx = name_to_index_places.get(place_name.lower())
    if idx is None:
        return []

    target_state = df_places.iloc[idx]["state"]

    sim_scores = sorted(
        list(enumerate(cosine_sim_places[idx])),
        key=lambda x: x[1],
        reverse=True
    )

    results, seen = [], set()

    for i, _ in sim_scores:
        row = df_places.iloc[i]
        name = row["name"]

        if (
            row["state"] == target_state and
            name.lower() != place_name.lower() and
            name not in seen
        ):
            results.append({
                "uniq_id": int(row["uniq_id"]),    
                "name": name,
                "city": row["city"],
                "state": row["state"]
            })
            seen.add(name)

        if len(results) == top_n:
            break

    return results



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



@app.get("/places/recommend")
def api_place(place_name: str, top_n: int = 5):
    return recommend_place(place_name, top_n)


@app.get("/places/recommend/city")
def api_place_city(place_name: str, top_n: int = 5):
    return recommend_place_in_city(place_name, top_n)


@app.get("/places/recommend/state")
def api_place_state(place_name: str, top_n: int = 5):
    return recommend_place_in_state(place_name, top_n)


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