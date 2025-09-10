Write-Host "Setting up NovaApp Chatbot Backend..." -ForegroundColor Green
Write-Host ""

Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
Set-Location backend
npm install

Write-Host ""
Write-Host "Backend setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Open backend/.env file" -ForegroundColor White
Write-Host "2. Update EMAIL_USER with your Gmail address" -ForegroundColor White
Write-Host "3. Update EMAIL_PASS with your Gmail App Password" -ForegroundColor White
Write-Host "4. Run: npm start" -ForegroundColor White
Write-Host ""
Write-Host "For detailed setup instructions, see backend/README.md" -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter to continue"
