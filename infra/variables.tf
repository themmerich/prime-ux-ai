variable "aws_region" {
  description = "Haupt-Region für S3 und alle regionalen Ressourcen"
  type        = string
  default     = "eu-central-1"
}

variable "domain_name" {
  description = "Apex-Domain der Webseite"
  type        = string
  default     = "prime-ux.de"
}

variable "budget_limit_usd" {
  description = "Monatliches Kosten-Limit in USD, ab dessen Näherung alarmiert wird"
  type        = string
  default     = "5"
}

variable "budget_email" {
  description = "Empfänger der Budget-Alarme"
  type        = string
  default     = "info@prime-ux.de"
}

# WICHTIG: Bevor die NS-Records beim Registrar auf Route 53 umgestellt werden,
# müssen die bestehenden Mail-Records (MX, SPF/TXT, ggf. DKIM/CNAME) vom
# aktuellen DNS-Provider hierher übernommen werden — sonst kommt keine Mail
# mehr auf info@prime-ux.de an. Werte beim aktuellen Provider ablesen und
# in infra/terraform.tfvars eintragen.
variable "mx_records" {
  description = "MX-Records für die Domain, z.B. [\"10 mx00.example.net\", \"20 mx01.example.net\"]"
  type        = list(string)
  default     = []
}

variable "mail_txt_records" {
  description = "TXT-Records für Mail (SPF etc.), z.B. [\"v=spf1 include:example.net ~all\"]"
  type        = list(string)
  default     = []
}

variable "dmarc_txt_records" {
  description = "TXT-Records für _dmarc.<domain>, z.B. [\"v=DMARC1;p=reject;\"]"
  type        = list(string)
  default     = []
}

variable "autoconfig_cname" {
  description = "CNAME-Ziel für autoconfig.<domain> (Mail-Client-Autokonfiguration), leer = kein Record"
  type        = string
  default     = ""
}
