output "name_servers" {
  description = "Diese NS-Records beim Registrar für prime-ux.de eintragen"
  value       = aws_route53_zone.site.name_servers
}

output "site_bucket" {
  description = "Ziel-Bucket für den S3-Sync im Deployment"
  value       = aws_s3_bucket.site.bucket
}

output "cloudfront_distribution_id" {
  description = "Distribution-ID für die Cache-Invalidation im Deployment"
  value       = aws_cloudfront_distribution.site.id
}

output "cloudfront_domain" {
  description = "CloudFront-URL (funktioniert schon vor der DNS-Umstellung)"
  value       = aws_cloudfront_distribution.site.domain_name
}
