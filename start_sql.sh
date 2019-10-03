#!/bin/bash
docker pull mcr.microsoft.com/mssql/server:2017-latest
docker rm -f sqlserver
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=<YourStrong!Passw0rd>" -p 1433:1433 --name sqlserver -v sqlvolume:/var/opt/mssql -d mcr.microsoft.com/mssql/server:2017-latest