# MediSense AI - Google Cloud Run Deployment Script (PowerShell)
param (
    [string]$ProjectId = "",
    [string]$Region = "asia-south1",
    [string]$ServiceName = "medisense-ai"
)

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  MediSense AI - Google Cloud Run Deploy  " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# 1. Check gcloud CLI
if (-not (Get-Command gcloud -ErrorAction SilentlyContinue)) {
    Write-Error "Google Cloud SDK (gcloud) is not installed or not in PATH."
    exit 1
}

# 2. Select or prompt for Project ID
if (-not $ProjectId) {
    $currentProject = gcloud config get-value project 2>$null
    if ($currentProject -and $currentProject -ne "(unset)") {
        $ProjectId = $currentProject
    } else {
        Write-Host "Active Projects in your account:" -ForegroundColor Yellow
        gcloud projects list
        $ProjectId = Read-Host "`nEnter the GCP Project ID to deploy to"
    }
}

if (-not $ProjectId) {
    Write-Error "Project ID is required."
    exit 1
}

Write-Host "`nTarget Project: $ProjectId" -ForegroundColor Green
Write-Host "Target Region:  $Region" -ForegroundColor Green
Write-Host "Service Name:   $ServiceName" -ForegroundColor Green

# 3. Set project
gcloud config set project $ProjectId

# 4. Check Billing
Write-Host "`nVerifying billing status for project '$ProjectId'..." -ForegroundColor Yellow
$billingInfo = gcloud beta billing projects describe $ProjectId 2>$null | Out-String
if ($billingInfo -match "billingEnabled:\s*false") {
    Write-Warning "Billing is NOT enabled for project '$ProjectId'."
    Write-Host "Google Cloud Run and Cloud Build require an active billing account linked to the project." -ForegroundColor Red
    Write-Host "Please enable billing at: https://console.cloud.google.com/billing/linkedaccount?project=$ProjectId" -ForegroundColor Cyan
    $confirm = Read-Host "`nHave you linked a billing account and want to continue? (y/N)"
    if ($confirm -ne "y" -and $confirm -ne "Y") {
        Write-Host "Deployment cancelled. Link billing and run this script again." -ForegroundColor Yellow
        exit 1
    }
}

# 5. Enable required APIs
Write-Host "`nEnabling required Google Cloud APIs (run, cloudbuild, artifactregistry)..." -ForegroundColor Yellow
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com --project=$ProjectId

# 6. Deploy directly to Cloud Run from source
Write-Host "`nDeploying MediSense AI container to Cloud Run..." -ForegroundColor Cyan
gcloud run deploy $ServiceName `
    --source . `
    --project $ProjectId `
    --region $Region `
    --platform managed `
    --allow-unauthenticated

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nDeployment completed successfully!" -ForegroundColor Green
    $url = gcloud run services describe $ServiceName --platform managed --region $Region --project $ProjectId --format 'value(status.url)'
    Write-Host "Live App URL: $url" -ForegroundColor Cyan
} else {
    Write-Error "Cloud Run deployment failed. Check the error logs above."
}
