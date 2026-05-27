@echo off
echo Starting The3DIndia Backend Server...
echo.

cd backend

echo Installing dependencies...
call npm install

echo.
echo Running setup...
call npm run setup

echo.
echo Starting server...
call npm start

pause