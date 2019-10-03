# Set framework and the app root in the container image
FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS build-env
WORKDIR /app
COPY ./src ./

WORKDIR /app/Sita.APC.Toolset.API
RUN dotnet restore
RUN dotnet ef database update
RUN dotnet publish -c Release -o out

# App listen this ports
EXPOSE 5001/tcp
EXPOSE 5000/tcp

# Build runtime image
FROM mcr.microsoft.com/dotnet/core/aspnet:2.2 AS runtime-env
WORKDIR /app
COPY --from=build-env /app/Sita.APC.Toolset.API/out ./
ENTRYPOINT [ "dotnet", "Sita.APC.Toolset.API.dll" ]