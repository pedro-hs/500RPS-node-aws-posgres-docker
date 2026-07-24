provider "aws" {
  region  = "us-east-1"
  profile = "personal"
}
data "aws_ami" "al2023" {
  most_recent = true
  owners      = ["amazon"]
  filter {
    name   = "name"
    values = ["al2023-ami-*-x86_64"]
  }
}
resource "aws_security_group" "api" {
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
resource "aws_security_group" "db" {
  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.api.id]
  }
}
resource "aws_db_instance" "db" {
  identifier             = "traffic-db"
  engine                 = "postgres"
  instance_class         = "db.t3.micro"
  allocated_storage      = 20
  db_name                = "traffic"
  username               = "traffic"
  password               = var.db_password
  vpc_security_group_ids = [aws_security_group.db.id]
  publicly_accessible    = false
  skip_final_snapshot    = true
}
resource "aws_instance" "api" {
  ami                    = data.aws_ami.al2023.id
  instance_type          = "t3.small"
  key_name               = var.key_name
  vpc_security_group_ids = [aws_security_group.api.id]
  user_data              = "#!/bin/bash\ndnf install -y docker git\nsystemctl enable --now docker\n"
}
variable "key_name" {}
variable "db_password" { sensitive = true }
output "api_ip" { value = aws_instance.api.public_ip }
output "db_host" { value = aws_db_instance.db.address }
