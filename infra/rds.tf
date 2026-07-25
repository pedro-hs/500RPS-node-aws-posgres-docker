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

output "db_host" { value = aws_db_instance.db.address }
