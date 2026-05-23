#!/bin/zsh
set -e

cd "$(dirname "$0")"

APP_URL="http://127.0.0.1:5173/von100/"

echo "von100 lokal starten"
echo "Arbeitsordner: $(pwd)"
echo ""

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js wurde nicht gefunden."
  echo "Bitte installiere Node.js LTS von https://nodejs.org/ und starte diese Datei danach erneut."
  echo ""
  read "unused?Druecke Enter zum Schliessen..."
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "npm wurde nicht gefunden. Bitte installiere Node.js LTS inklusive npm."
  echo ""
  read "unused?Druecke Enter zum Schliessen..."
  exit 1
fi

if [ ! -d "node_modules" ]; then
  echo "Installiere Abhaengigkeiten..."
  npm install
  echo ""
fi

echo "Oeffne ${APP_URL}"
open "${APP_URL}" >/dev/null 2>&1 || true
echo ""
echo "Der lokale Server laeuft, solange dieses Terminalfenster offen ist."
echo "Zum Beenden: Ctrl+C druecken oder das Fenster schliessen."
echo ""

npm run dev -- --host 127.0.0.1 --port 5173
