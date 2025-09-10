@echo off
echo Setting up NovaApp Chatbot Backend...
echo.

echo Installing backend dependencies...
cd backend
npm install

echo.
echo Backend setup complete!
echo.
echo Next steps:
echo 1. Open backend/.env file
echo 2. Update EMAIL_USER with your Gmail address
echo 3. Update EMAIL_PASS with your Gmail App Password
echo 4. Run: npm start
echo.
echo For detailed setup instructions, see backend/README.md
echo.
pause
