terraform {
  required_version = ">= 1.10"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.41"
    }
  }

  # Der State-Bucket muss einmalig vor dem ersten `terraform init` angelegt
  # werden — siehe infra/README.md (Bootstrap).
  backend "s3" {
    bucket       = "prime-ux-tfstate"
    key          = "prime-ux/terraform.tfstate"
    region       = "eu-central-1"
    use_lockfile = true # natives S3-Locking (Terraform >= 1.10), kein DynamoDB nötig
    encrypt      = true
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project   = "prime-ux.de"
      ManagedBy = "terraform"
    }
  }
}

# CloudFront akzeptiert ACM-Zertifikate ausschließlich aus us-east-1.
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"

  default_tags {
    tags = {
      Project   = "prime-ux.de"
      ManagedBy = "terraform"
    }
  }
}
