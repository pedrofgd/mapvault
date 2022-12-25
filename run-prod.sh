trap 'kill %1' SIGINT
dotnet run --project api/src --environment Production & npm run dev --prefix web
