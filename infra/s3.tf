resource "aws_s3_bucket" "front" {
  bucket = "traffic-front-${var.key_name}"
}

resource "aws_s3_bucket_website_configuration" "front" {
  bucket = aws_s3_bucket.front.id
  index_document { suffix = "index.html" }
  error_document { key = "index.html" }
}

resource "aws_s3_bucket_public_access_block" "front" {
  bucket                  = aws_s3_bucket.front.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "front" {
  bucket     = aws_s3_bucket.front.id
  depends_on = [aws_s3_bucket_public_access_block.front]
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = "*"
      Action    = "s3:GetObject"
      Resource  = "${aws_s3_bucket.front.arn}/*"
    }]
  })
}

output "front_bucket" { value = aws_s3_bucket.front.bucket }
output "front_url" {
  value = "http://${aws_s3_bucket_website_configuration.front.website_endpoint}"
}
