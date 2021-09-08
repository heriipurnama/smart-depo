# SmartDepo
### Documentation API-v1

    1. https://documenter.getpostman.com/view/1906010/TzshHkCk

### Running PM2
    ~#pm2 start config-pm2-start.json    

### Make container Redis from Docker image Docker Registry
    ~#docker-compose up -d 

### check running pm2
    ~#pm2 list                                                                                                                                                                                                  
⇆ PM2+ activated | Instance Name: exabytes-36490711-79fe | Dash: https://app.pm2.io/#/r/tsrm5atxp24pr7c                                                                                                                             
┌─────┬─────────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐                                                                                      
│ id  │ name            │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │                                                                                      
├─────┼─────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤                                                                                      
│ 0   │ BE-SmartDepo    │ default     │ 1.0.0   │ fork    │ 21816    │ 15h    │ 146  │ online    │ 0%       │ 78.7mb   │ root     │ enabled  │  

### check docker
    ~# docker images && docker container ps                                                                                                                                                                      
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE                                                                                                                                                                            
redis        buster    ddcca4b8a6f0   3 weeks ago   105MB                                                                                                                                                                    
CONTAINER ID   IMAGE          COMMAND                  CREATED       STATUS       PORTS                                       NAMES                                                                                                 
e90f6ab89c25   redis:buster   "docker-entrypoint.s…"   2 weeks ago   Up 2 weeks   0.0.0.0:6379->6379/tcp, :::6379->6379/tcp   redis-buster-0.1                                                                                                                                                                                                                