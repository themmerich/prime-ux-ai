# Diese Datei ist bewusst eingecheckt — DNS-Records sind öffentliche Daten,
# die Pipeline braucht sie beim Apply.

# Mail-Records, übernommen vom bisherigen DNS-Provider (STRATO),
# per DNS-Abfrage inventarisiert am 06.07.2026:
mx_records = ["5 smtpin.rzone.de"]

# Es existiert aktuell kein SPF-Record — bewusst so übernommen.
mail_txt_records = []

dmarc_txt_records = ["v=DMARC1;p=reject;"]

# Mail-Client-Autokonfiguration (STRATO)
autoconfig_cname = "autoconfigure.strato.de"
