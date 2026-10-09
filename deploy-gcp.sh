#!/usr/bin/env bash
# MediSense AI - Google Cloud Run Deployment Script (Bash)
set -e

PROJECT_ID="${1:-$(gcloud config get-value project 2>/dev/null)}"
REGION="${2:-asia-south1}"
SERVICE_NAME="medisense-ai"

echo "=========================================="
echo "  MediSense AI - Google Cloud Run Deploy  "
echo "=========================================="

if [ -z "$PROJECT_ID" ] || [ "$PROJECT_ID" = "(unset)" ]; then
    echo "Active Projects:"
    gcloud projects list
    read -p "Enter GCP Project ID: " PROJECT_ID
fi

echo "Project: $PROJECT_ID"
echo "Region:  $REGION"
echo "Service: $SERVICE_NAME"

gcloud config set project "$PROJECT_ID"

echo "Enabling necessary APIs..."
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com --project="$PROJECT_ID"

echo "Deploying to Cloud Run..."
gcloud run deploy "$SERVICE_NAME" \
    --source . \
    --project "$PROJECT_ID" \
    --region "$REGION" \
    --platform managed \
    --allow-unauthenticated

echo "Deployment complete!"
gcloud run services describe "$SERVICE_NAME" --platform managed --region "$REGION" --project "$PROJECT_ID" --format 'value(status.url)'
