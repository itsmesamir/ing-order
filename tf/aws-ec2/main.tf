provider "aws" {
  region = "ap-south-1"
}

# Define the variables
variable "github_token" {
  description = "GitHub personal access token for cloning the repository"
  type        = string
}

variable "db_password" {
  description = "MySQL root password"
  type        = string
}

variable "db_user" {
  description = "MySQL user"
  type        = string
}

variable "db_name" {
  description = "Database name"
  type        = string
}

variable "private_key" {
  description = "SSH private key for Git"
  type        = string
}

resource "aws_instance" "ing_instance" {
  ami           = "ami-0522ab6e1ddcc7055" # Update to the latest Ubuntu AMI for ap-south-1
  instance_type = "t2.medium"
  key_name      = "ing" # Replace with your existing key pair

  # Tags
  tags = {
    Name = "ing-instance"
  }

  # Security group
  vpc_security_group_ids = [aws_security_group.ing_sg.id]

  # User data script to set up the environment
  user_data = <<-END
              #!/bin/bash
              export DEBIAN_FRONTEND=noninteractive
              set -e

              # Update and install packages
              sudo apt update -y
              sudo apt upgrade -y
              sudo apt install -y git curl software-properties-common mysql-server

              # Install Node.js
              sudo curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
              sudo apt install -y nodejs
              sudo npm install -g pm2 yarn

              # Configure SSH for Git
              # mkdir -p /home/ubuntu/.ssh
              # echo "${var.private_key}" > /home/ubuntu/.ssh/id_rsa
              # chmod 600 /home/ubuntu/.ssh/id_rsa
              # ssh-keyscan github.com >> /home/ubuntu/.ssh/known_hosts

              # Clone repository and set up the application
              git clone https://${var.github_token}@github.com/itsmesamir/ing-order.git /home/ubuntu/ing-order
              cd /home/ubuntu/ing-order/app
              yarn install
              yarn run build
              cp .env.example .env
              pm2 serve build/ 3000 --name "react-app" --spa
              pm2 save

              # Additional setup commands
              cd ../server

              cp .env.example .env

              # Replace placeholders in .env file
              sed -i "s/<DB_NAME>/${var.db_name}/g" .env
              sed -i "s/<DB_USER>/${var.db_user}/g" .env
              sed -i "s/<DB_PASSWORD>/${var.db_password}/g" .env

              yarn
              sudo chown -R ubuntu:ubuntu /home/ubuntu/leave-app/server/dist
              yarn run build
              pm2 start npm --name "node-app" -- run start
              pm2 save

              # Start MySQL server and configure it
              sudo systemctl start mysql
              sudo systemctl enable mysql

              # Create a MySQL user and database
              sudo mysql -u root -p${var.db_password} <<-SQL
              CREATE DATABASE ${var.db_name};
              CREATE USER '${var.db_user}'@'localhost' IDENTIFIED BY '${var.db_password}';
              GRANT ALL PRIVILEGES ON ${var.db_name}.* TO '${var.db_user}'@'localhost';
              FLUSH PRIVILEGES;
              SQL


              # Migrate and seed the database
              cd /home/ubuntu/ing-order/server
              yarn run migrate
              yarn run seed

              END
}

resource "aws_security_group" "ing_sg" {
  name_prefix = "ing-sg-"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Allow SSH from anywhere, adjust for security
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Allow HTTP from anywhere, adjust for security
  }

  ingress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Allow MySQL from anywhere, adjust for security
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "ing-security-group"
  }
}

output "instance_id" {
  value = aws_instance.ing_instance.id
}

output "public_ip" {
  value = aws_instance.ing_instance.public_ip
}
