import pandas as pd
import os

class FlatFileHandler:
    def write_csv(self, df):
        df.to_csv("output.csv", index=False)
        return len(df)

    def import_to_clickhouse(self, file, client, target_table):
        df = pd.read_csv(file.file)
        client.insert_df(target_table, df)
        return len(df)