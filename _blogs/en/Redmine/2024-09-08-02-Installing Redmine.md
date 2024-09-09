---
layout: blog
title: "02-Installing Redmine"
date: 2024-09-08 09:56:00 +0800
language: en
lang: en
categories: Redmine
tags: Redmine
---

<p class="text-wrap mx-2">
Follow these steps to install Redmine on Windows and use SQLite as the database:
</p>

## Install Ruby

<p class="text-wrap mx-2">
Download and install Ruby:
Visit <a href="https://rubyinstaller.org/">RubyInstaller</a> to download and install Ruby. Choose the "WITH DEVKIT" version to include the Development Kit (DevKit).
During installation, make sure to check "Add Ruby executables to your PATH" to add Ruby to your system path, allowing you to use Ruby commands directly from the command prompt.
</p>

## Install Bundler

<p class="text-wrap mx-2">
Bundler is a Ruby tool for managing gem dependencies in Ruby projects.
</p>

```bash
gem install bundler
