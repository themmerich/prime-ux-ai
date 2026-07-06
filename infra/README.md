# Infrastruktur (Terraform → AWS)

Statisches Hosting: **S3** (privat) → **CloudFront** (CDN, HTTPS, SPA-Fallback) → **Route 53** (DNS) → **ACM** (Zertifikat). Dazu ein **Budget-Alarm** (5 USD/Monat). Deployment über GitHub Actions ([.github/workflows/deploy.yml](../.github/workflows/deploy.yml)): Trivy-Scan → Terraform Apply → `ng build` → S3-Sync → CloudFront-Invalidation.

Erwartete Kosten: **< 1 USD/Monat** (im Wesentlichen die Route-53-Zone; CloudFront/ACM sind im Free Tier).

## Einmaliges Bootstrap

### 1. State-Bucket anlegen

Terraform kann seinen eigenen State-Bucket nicht verwalten. Einmalig (Name muss zu `backend "s3"` in [main.tf](main.tf) passen; falls `prime-ux-tfstate` weltweit schon vergeben ist, Namen an beiden Stellen ändern):

```bash
aws s3api create-bucket --bucket prime-ux-tfstate \
  --region eu-central-1 --create-bucket-configuration LocationConstraint=eu-central-1
aws s3api put-bucket-versioning --bucket prime-ux-tfstate \
  --versioning-configuration Status=Enabled
aws s3api put-public-access-block --bucket prime-ux-tfstate \
  --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
```

### 2. IAM-User für die Pipeline

IAM-User `prime-ux-deploy` (ohne Konsolen-Zugang) mit Berechtigungen für S3, CloudFront, Route 53, ACM und Budgets anlegen und Access Keys erzeugen. Für den Start tut es `AdministratorAccess`; enger gefasst reichen die AWS-Managed-Policies `AmazonS3FullAccess`, `CloudFrontFullAccess`, `AmazonRoute53FullAccess`, `AWSCertificateManagerFullAccess` plus `budgets:*`.

> Ausbaustufe später: OIDC-Federation (GitHub → AWS) statt langlebiger Keys.

### 3. GitHub-Secrets setzen

Repo → Settings → Secrets and variables → Actions:

| Secret | Wert |
|---|---|
| `AWS_ACCESS_KEY_ID` | Access Key des Deploy-Users |
| `AWS_SECRET_ACCESS_KEY` | zugehöriger Secret Key |

### 4. E-Mail-Records übernehmen (WICHTIG!)

`info@prime-ux.de` läuft über den aktuellen DNS-Provider. **Vor** der NS-Umstellung dort alle MX- und TXT/SPF-Records (ggf. DKIM) ablesen und in [terraform.tfvars](terraform.tfvars) eintragen — sonst geht eingehende Mail verloren.

### 5. Erster Apply & DNS-Umstellung

Der erste Apply legt die Route-53-Zone an, wartet dann aber auf die Zertifikats-Validierung — die erst durchläuft, wenn die Domain auf Route 53 zeigt. Ablauf:

1. Ersten Deploy-Lauf starten (Push auf `main` oder lokal `terraform -chdir=infra apply`). Der Schritt `aws_acm_certificate_validation` wartet (bis zu 75 min).
2. Parallel die Name-Server auslesen: `terraform -chdir=infra output name_servers`
3. Beim Registrar von prime-ux.de die NS-Einträge auf diese vier Route-53-Server umstellen.
4. Sobald DNS propagiert ist, läuft die Validierung durch und der Rest wird angelegt. Falls der Lauf vorher abbricht: einfach neu starten, Terraform macht idempotent weiter.
5. In der AWS-Konsole/per Mail-Test prüfen, dass Mail weiter ankommt.

Alle folgenden Deployments sind dann ein reiner Push auf `main`.
