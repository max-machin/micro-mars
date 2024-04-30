# micro-mars
Projet scolaire : site internet en architecture micro-services pour la foire de Marseille  

### 1. Architecture micro-services   

#### 1.1 Base de données   

Système de gestion de base de données : MongoDB   

Une BDD pour chaque projet ou (micro-services)  

### 2. Micro-services   

#### 2.1 Github & Jira  

Un micro-service correspond à une Epic qui peut contenir un / plusieurs ticket(s).  

##### 2.1.1 Création d'une Epic 

Avant de créer une Epic, il faut s'assurer que le service n'existe pas dans l repo Git ou le tableau Jira.   
Après s'être assuré que l'Epic (service) n'existe pas, depuis Jira : 
- Créer le ticket de type : Epic
- Décrire le service cible dans le résumé et dans la description :
  - Les normes de nomanclature des Epic doivent-être respectés : service-mail , service-authentification, service-media .... etc

La prochaine étape consiste à créer la branche GIT en lien avec l'epic  
git checkout -b (nom de l'epic)  

Une fois l'epic créer, il est possible de lui lié un ou plusieurs tickets (tâche).
Ces tâches peuvent permettre de découper le travail à faire pour un service qui serait trop conséquent exemple : 
Epic = service-mail  
Tâche 1 : service-mail-forgotPassword  
Tâche 2 : service-mail-withMedia   
...  

Une fois le ticket de la tâche rédigé, il est possible depuis la branche concernant l'Epic de nommé les commits en fonction de nom de la tâche 

Exemple :  
git commit -m "micro-mail-forgotPassword : ajout de la fonction de cryptage du mot de passe"  











