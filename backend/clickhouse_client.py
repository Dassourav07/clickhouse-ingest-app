import clickhouse_connect
import pandas as pd

class ClickHouseClient:
    _cache = {}

    def __init__(self, host, port, user, token, database):
        self.client = clickhouse_connect.get_client(
            host=host,
            port=port,
            username=user,
            password=token,
            database=database,
            secure=True
        )
        self.database = database
        ClickHouseClient._cache['client'] = self.client

    def get_tables(self):
        return self.client.query(f"SHOW TABLES FROM {self.database}").result_rows

    def get_columns(self, table):
        query = f"DESCRIBE TABLE {table}"
        result = self.client.query(query).result_rows
        return [col[0] for col in result]

    def export_to_csv(self, handler, table, columns):
        query = f"SELECT {','.join(columns)} FROM {table}"
        df = self.client.query_df(query)
        return handler.write_csv(df)

    @classmethod
    def restore_from_cache(cls):
        return cls._cache.get('client')
