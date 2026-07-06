# Kosten-Wächter: alarmiert per E-Mail, bevor es teuer wird.
# Erwartete reale Kosten: < 1 USD/Monat (Route-53-Zone + Rundungsfehler).
resource "aws_budgets_budget" "monthly" {
  name         = "prime-ux-monthly"
  budget_type  = "COST"
  limit_amount = var.budget_limit_usd
  limit_unit   = "USD"
  time_unit    = "MONTHLY"

  # Warnung bei 80 % der tatsächlichen Kosten …
  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 80
    threshold_type             = "PERCENTAGE"
    notification_type          = "ACTUAL"
    subscriber_email_addresses = [var.budget_email]
  }

  # … und wenn die Prognose das Limit reißt.
  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 100
    threshold_type             = "PERCENTAGE"
    notification_type          = "FORECASTED"
    subscriber_email_addresses = [var.budget_email]
  }
}
