# Diese Datei ist bewusst eingecheckt — DNS-Records sind öffentliche Daten,
# die Pipeline braucht sie beim Apply.

# TODO vor der NS-Umstellung: Mail-Records vom aktuellen DNS-Provider
# übernehmen, sonst kommt auf info@prime-ux.de keine Mail mehr an!
# Beispiel:
# mx_records       = ["10 mx00.provider.de.", "20 mx01.provider.de."]
# mail_txt_records = ["v=spf1 include:provider.de ~all"]
mx_records       = []
mail_txt_records = []
