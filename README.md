```
aws ec2 create-key-pair --profile personal --key-name traffic-key \
  --query 'KeyMaterial' --output text > ~/traffic-key.pem
chmod 400 ~/traffic-key.pem

# edit infra/terraform.tfvars.example to infra/terraform.tfvars, and set db_password to a real value

cd infra
terraform init
terraform apply

# note the api_ip and db_host outputs

ssh -i ~/traffic-key.pem ec2-user@<api_ip>
git clone https://github.com/pedro-hs/500RPS-node-aws-posgres-docker.git ~/traffic
cd ~/traffic
./db/setup.sh <db_host> <db_password>
exit

# edit github secrets/variables
  secret  EC2_HOST 1.2.3.4
  secret  EC2_SSH_KEY (contents of ~/traffic-key.pem)
  secret  DATABASE_URL postgres://traffic:PASSWORD@HOST:5432/traffic
  variable  PORT 3000
  variable  HOST 0.0.0.0
  variable  CORS_ORIGIN https://your-frontend.com
  variable  RATE_LIMIT_MAX 50
  variable  CLUSTER_ENABLED true
  variable  CACHE_ENABLED true
  variable  CACHE_TTL_SECONDS 30

git commit --allow-empty -m "trigger deploy"
git push

curl http://<api_ip>:3000/health
# should print {"status":"ok"}
curl http://<api_ip>:3000/api/v1/catalog/countries
```
