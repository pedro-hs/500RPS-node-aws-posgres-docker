- Serverless solution that handle 500 RPS per aggregated enpoint, using Node (Fastify), AWS (EC2, RDS, S3), React (Vite, Recharts), Github Actions and Terraform.

- Arch:
```
  Browser
    │
    │  static UI
    ▼
  S3 (React / Vite / Recharts)
    │
    │  REST /api/v1
    ▼
  EC2
    │
    ▼
    Node + Docker + Fastify
    │
    ├─ rate limit
    ├─ in-process node cache (TTL)
    ├─ Node cluster
    │
    ▼
  RDS PostgreSQL
    ├─ traffic_events
    ├─ country_traffic_total
    └─ vehicle_type_total

  Terraform: Build EC2, RDS and S3 once
  CI/CD: GitHub Actions → deploy API to EC2, front to S3
  Local: run-local.sh → Docker Postgres + API + Vite
```

### Performance Validation (K6 Load Test Results)
At approximately 500 iterations/s per aggregated GET endpoint (Country-wise Traffic and Vehicle Type Distribution), with both endpoints tested concurrently, the cache-on configuration maintained an average response time of ~171 ms with almost no dropped iterations. With cache-off, average latency increased to just over 200 ms and the test experienced more dropped iterations under the same load. This indicates that the cache effectively absorbed most database reads, reducing latency and improving throughput under concurrent access.

### How scale?
- 5 RPS -> single node process + postgres same server
- 50 RPS -> node cluster + connection pool + index
- 500 RPS -> vertical scale + node cache + aggregation table + split EC2, RDS
- +10000 RPS (reading from aggregation table) -> Horizontal API scale using Application Layer Load Balancer with Least Response Time algorithm helps, until DB or a single hot row turns the bottleneck, then DB replicas, Redis + Elastic Cache, async counters matters more than another EC2.

# HOW RUN LOCALLY?
```
source run-local.sh or ./run-local.sh
```
- API: http://localhost:3000
- UI: http://localhost:5173/

# HOW DEPLOY?

- Create AWS account

- Configure this AWS account profile, and ensure has same profile name in 'aws configure --profile [YOU_PROFILE]' and infra/main.tf::provider.aws.profile

### Delete EC2 key pair (if needed)
```
aws ec2 delete-key-pair --profile personal --key-name traffic-key
rm ~/traffic-key.pem
```

### Create new EC2 key pair
```
aws ec2 create-key-pair --profile personal --key-name traffic-key \
  --query 'KeyMaterial' --output text > ~/traffic-key.pem
chmod 400 ~/traffic-key.pem
```

- Copy infra/terraform.tfvars.example to infra/terraform.tfvars, and set db_password with DB password value

### Execute terraform
```
cd infra
terraform init
terraform apply
```
- Terraform execution will output: api_ip, db_host, front_bucket, front_url outputs

### Enter EC2 box
```
ssh -i ~/traffic-key.pem ec2-user@<api_ip>
```
### Clone repo
```
git clone https://github.com/pedro-hs/500RPS-node-aws-posgres-docker.git ~/traffic
cd ~/traffic
```
### Run DB steup and exit EC2 box
```
./db/setup_in_ec2_box.sh <db_host> <db_password>
exit
```

### Download and configure 'gh' (github cli) to set secrets/variables (or set manually)
```
gh secret set EC2_HOST --repo pedro-hs/500RPS-node-aws-posgres-docker --body "1.2.3.4"
gh secret set EC2_SSH_KEY --repo pedro-hs/500RPS-node-aws-posgres-docker < ~/traffic-key.pem
gh secret set DATABASE_URL --repo pedro-hs/500RPS-node-aws-posgres-docker --body "postgres://traffic:[PASSWORD]@traffic-db.[DBIP].us-east-1.rds.amazonaws.com:5432/traffic"
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
```

### Trigger deploy via empty commit or 'gh' 
```
git commit --allow-empty -m "trigger deploy"
git push
```

### Check if API is running in EC2 and searching from RDS postgres
```
curl http://<api_ip>:3000/api/v1/catalog/countries
```
