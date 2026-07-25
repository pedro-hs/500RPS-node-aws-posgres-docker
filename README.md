```
aws ec2 delete-key-pair --profile personal --key-name traffic-key
rm ~/traffic-key.pem
aws ec2 create-key-pair --profile personal --key-name traffic-key \
  --query 'KeyMaterial' --output text > ~/traffic-key.pem
chmod 400 ~/traffic-key.pem

# edit infra/terraform.tfvars.example to infra/terraform.tfvars, and set db_password to a real value (e.g. `openssl rand -hex 16`)

cd infra
terraform init
terraform apply

# note the api_ip, db_host, front_bucket, and front_url outputs

ssh -i ~/traffic-key.pem ec2-user@<api_ip>
git clone https://github.com/pedro-hs/500RPS-node-aws-posgres-docker.git ~/traffic
cd ~/traffic
./db/setup_in_ec2_box.sh <db_host> <db_password>
exit

sudo apt install gh
# download and configure gh (github cli) to secrets/variables or set manually
gh secret set EC2_HOST --repo pedro-hs/500RPS-node-aws-posgres-docker --body "1.2.3.4"
gh secret set EC2_SSH_KEY --repo pedro-hs/500RPS-node-aws-posgres-docker < ~/traffic-key.pem
gh secret set DATABASE_URL --repo pedro-hs/500RPS-node-aws-posgres-docker --body "postgres://traffic:[PASSWORD]@traffic-db.[XPTO].us-east-1.rds.amazonaws.com:5432/traffic"
gh secret set AWS_ACCESS_KEY_ID --repo pedro-hs/500RPS-node-aws-posgres-docker --body "<key>"
gh secret set AWS_SECRET_ACCESS_KEY --repo pedro-hs/500RPS-node-aws-posgres-docker --body "<secret>"
gh variable set PORT --repo pedro-hs/500RPS-node-aws-posgres-docker --body "3000"
gh variable set HOST --repo pedro-hs/500RPS-node-aws-posgres-docker --body "0.0.0.0"
gh variable set CORS_ORIGIN --repo pedro-hs/500RPS-node-aws-posgres-docker --body "*"
gh variable set RATE_LIMIT_MAX --repo pedro-hs/500RPS-node-aws-posgres-docker --body "50"
gh variable set CLUSTER_ENABLED --repo pedro-hs/500RPS-node-aws-posgres-docker --body "true"
gh variable set CACHE_ENABLED --repo pedro-hs/500RPS-node-aws-posgres-docker --body "true"
gh variable set CACHE_TTL_SECONDS --repo pedro-hs/500RPS-node-aws-posgres-docker --body "30"
gh variable set AWS_REGION --repo pedro-hs/500RPS-node-aws-posgres-docker --body "us-east-1"
gh variable set S3_BUCKET --repo pedro-hs/500RPS-node-aws-posgres-docker --body "<front_bucket>"
gh variable set VITE_API_URL --repo pedro-hs/500RPS-node-aws-posgres-docker --body "http://<api_ip>:3000/api/v1"

git commit --allow-empty -m "trigger deploy"
git push

curl http://<api_ip>:3000/health
# should print {"status":"ok"}
curl http://<api_ip>:3000/api/v1/catalog/countries
# open <front_url> for the UI
```
