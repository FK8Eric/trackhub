import subprocess
import os
import pathlib

current_dir = str(pathlib.Path(__file__).parent.resolve())


all_schemas = [f for f in os.listdir(current_dir + "/schemas/")]
schema_defs = []

for schema in all_schemas:
    with open(current_dir + "/schemas/" + schema, "r") as f:
        lines = f.readlines()
        [schema_defs.append(line.rstrip()) for line in lines]

curlys = ""
for i in range(len(schema_defs)):
    if i == len(schema_defs) - 1:
        curlys = curlys + "  {}"
    else:
        curlys = curlys + "  {}\n"

bash_script = """
#!/bin/bash

set -e
export PGPASSWORD=$POSTGRES_PASSWORD;
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE USER $APP_DB_USER WITH PASSWORD '$APP_DB_PASS';
  CREATE DATABASE $APP_DB_NAME;
  GRANT ALL PRIVILEGES ON DATABASE $APP_DB_NAME TO $APP_DB_USER;
  \connect $APP_DB_NAME $APP_DB_USER
  BEGIN;
{}
  COMMIT;
EOSQL
""".format(curlys).format(*schema_defs)

print(bash_script)

process = subprocess.Popen(bash_script, shell=True, stdout=subprocess.PIPE)
stdout = process.communicate()[0]
print('STDOUT:{}'.format(stdout))