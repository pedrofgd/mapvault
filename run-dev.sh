trap 'kill %1' SIGINT
dotnet run --project api/src & npm run dev --prefix web
