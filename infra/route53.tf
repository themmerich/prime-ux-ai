resource "aws_route53_zone" "site" {
  name = var.domain_name

  # Zone nicht versehentlich per `terraform destroy` löschen —
  # der NS-Wechsel beim Registrar wäre sonst hinfällig.
  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_route53_record" "apex_a" {
  zone_id = aws_route53_zone.site.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "apex_aaaa" {
  zone_id = aws_route53_zone.site.zone_id
  name    = var.domain_name
  type    = "AAAA"

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www_a" {
  zone_id = aws_route53_zone.site.zone_id
  name    = "www.${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www_aaaa" {
  zone_id = aws_route53_zone.site.zone_id
  name    = "www.${var.domain_name}"
  type    = "AAAA"

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}

# --- E-Mail (info@prime-ux.de) -------------------------------------------
# Diese Records MÜSSEN vor der NS-Umstellung gesetzt sein, sonst geht
# eingehende Mail verloren. Werte vom aktuellen DNS-Provider übernehmen
# und in terraform.tfvars eintragen (siehe infra/README.md).

resource "aws_route53_record" "mx" {
  count = length(var.mx_records) > 0 ? 1 : 0

  zone_id = aws_route53_zone.site.zone_id
  name    = var.domain_name
  type    = "MX"
  ttl     = 3600
  records = var.mx_records
}

resource "aws_route53_record" "mail_txt" {
  count = length(var.mail_txt_records) > 0 ? 1 : 0

  zone_id = aws_route53_zone.site.zone_id
  name    = var.domain_name
  type    = "TXT"
  ttl     = 3600
  records = var.mail_txt_records
}

resource "aws_route53_record" "dmarc" {
  count = length(var.dmarc_txt_records) > 0 ? 1 : 0

  zone_id = aws_route53_zone.site.zone_id
  name    = "_dmarc.${var.domain_name}"
  type    = "TXT"
  ttl     = 3600
  records = var.dmarc_txt_records
}

resource "aws_route53_record" "autoconfig" {
  count = var.autoconfig_cname != "" ? 1 : 0

  zone_id = aws_route53_zone.site.zone_id
  name    = "autoconfig.${var.domain_name}"
  type    = "CNAME"
  ttl     = 3600
  records = [var.autoconfig_cname]
}
