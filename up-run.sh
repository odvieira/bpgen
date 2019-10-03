#!/bin/bash
dotnet ef database update --project ./src/back-end/Sita.APC.Toolset.API/Sita.APC.Toolset.API.csproj
dotnet run --project ./src/back-end/Sita.APC.Toolset.API/Sita.APC.Toolset.API.csproj