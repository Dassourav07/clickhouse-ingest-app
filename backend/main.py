from fastapi import FastAPI, UploadFile, Form, File
from fastapi.middleware.cors import CORSMiddleware
from clickhouse_client import ClickHouseClient
from flatfile_handler import FlatFileHandler
import os
from clickhouse_driver import Client
import csv

class FlatFileHandler:
    def import_to_clickhouse(self, file, client: Client, target_table: str):
        try:
            # Attempt to decode with utf-8 first
            raw_data = file.file.read()
            try:
                decoded_data = raw_data.decode("utf-8")
            except UnicodeDecodeError:
                decoded_data = raw_data.decode("ISO-8859-1")  # Fallback if utf-8 fails

            csv_data = decoded_data.splitlines()
            csv_reader = csv.reader(csv_data)
            headers = next(csv_reader)
            rows = [tuple(row) for row in csv_reader]

            client.execute(f"INSERT INTO {target_table} ({','.join(headers)}) VALUES", rows)
            return len(rows)

        except Exception as e:
            print(f"Error inserting data: {e}")
            return 0

        

app = FastAPI()

# Allow React frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/connect_clickhouse")
async def connect_clickhouse(
    host: str = Form(...),
    port: int = Form(...),
    user: str = Form(...),
    database: str = Form(...),
    jwt_token: str = Form(...)
):
    print(f"Received data: host={host}, port={port}, user={user}, database={database}, jwt_token={jwt_token}")
    client = ClickHouseClient(host, port, user, jwt_token, database)
    tables = client.get_tables()
    return {"tables": tables}



@app.post("/get_columns")
async def get_columns(table: str = Form(...)):
    client = ClickHouseClient.restore_from_cache()
    columns = client.get_columns(table)
    return {"columns": columns}

@app.post("/clickhouse_to_flatfile")
async def ch_to_file(table: str = Form(...), columns: str = Form(...)):
    client = ClickHouseClient.restore_from_cache()
    handler = FlatFileHandler()
    count = client.export_to_csv(handler, table, columns.split(","))
    return {"status": "success", "records": count}

@app.post("/flatfile_to_clickhouse")
async def file_to_ch(
    file: UploadFile = File(...),
    target_table: str = Form(...)
):
    client = ClickHouseClient.restore_from_cache()
    handler = FlatFileHandler()
    count = handler.import_to_clickhouse(file, client, target_table)
    return {"status": "success", "records": count}