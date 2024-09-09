---
layout: blog
title: "03-Setting Up Redmine Administrator Account and Email Notifications"
date: 2024-09-09 09:56:00 +0800
language: en
categories: Redmine
tags: Redmine
---

Setting Admin Password

Log in to Redmine

After accessing Redmine, click the "Login" option at the top right corner.

Log in with Default Admin Account

makefile
複製程式碼
Username: admin
Password: admin
System Forces Password Change

Redmine will require you to set a new password.

After Changing Password

The system will automatically redirect you to the "My Account" page. On this page, you can update relevant information. Make sure to change the email address to a valid one, as this address will be used in the subsequent email configuration.

Setting Up Email Notifications

Modify config/configuration.yml

Redmine typically provides a sample file named configuration.yml.example. Simply copy and rename this file to configuration.yml, then modify it as follows:

```yaml

email_delivery:
  delivery_method: :smtp
  smtp_settings:
    address: "smtp.gmail.com"
    port: 587
    domain: "Redmine.com" # Replace with your domain
    authentication: :plain
    user_name: <Your Gmail Address>
    password: <Your Gmail Password or App-Specific Password>
    enable_starttls_auto: true
```
Since we are using Google as the SMTP server, you need to set up two-step verification on your Google account and use Google's app-specific password.

Restart Redmine Server

After making these changes, restart the Redmine server to apply the configuration.

Testing Email Notifications

Access Email Settings Page

In the Redmine administration interface, navigate to "Settings" > "Email notifications".

Test Email Sending

At the bottom of the page, there is a "Send test email" option. Click it to check if an email can be successfully sent to the address you set in "My Account".

Configure Email Notification Content

On the same page, you can also set up the content for email notifications.

Additional Settings

Redmine is user-friendly, and any remaining configuration can be followed according to system prompts. This guide does not cover those additional details.