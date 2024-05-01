# Micro Mars

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/works-on-my-machine.svg)](https://forthebadge.com)

<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>

*Ce projet est réalisé dans un cadre scolaire.*

# Table des matières

- [Le Projet](#le-projet)
- [Workflow Git](#workflow-git)
- [Organisation architecture](#organisation-architecture)
- [API's](#API)
- [Endpoints](#endpoints)
- [Base de données](#BDD)
- [Installation](#installation)
- [Contributions](#contributing)

## Le Projet

Mise en place d'une application en architecture **micro-services**, pour l'occasion de la foire de Marseille. 

- technos : NestJs, Kafka
- Durée : 15 jours

## Workflow Git

### Organisation 

Les **Epics** sont crées et organisé selon les besoins en développement. Les **Epics** englobent la totalité de la mise en place d’un **micro-service** de manière indépendante. Ils peuvent être constitués de multiples **tâches** selon le périmètre du développement.

Les **branches** du repository Git sont faites à partir de ces **Epic**. 

### Création d'un Epic

Un micro-service de l’application correspond à un Epic. Cet Epic peut se composer de un / plusieurs ticket(s). 

Afin d’uniformiser la création des Epic et donc la nomenclature des **branches** et **commit**, des règles sont définis ci-dessous : 

Avant la création d’un Epic, il est nécessaire de s’assurer qu’il n’existe pas déjà dans le tableau Jira ou dans les branches Git.

#### Jira
Après s'être assuré que l'Epic (service) n'existe pas, depuis Jira :

- Créer un nouveau ticket de type “Epic”

- Décrire le service cible dans le résumé en respectant les normes de nommage (service + type de service) :
service-mail , service-authentification, service-media .... etc

#### Git
Une fois l’Epic créer depuis le tableau Jira, il est maintenant possible de passer à la création de branche Git.

Afin de maintenir un lien entre L’Epic Jira et la branche crée, il est nécessaire de créer la branche avec le nom de l’Epic lié.
```Shell
git checkout -b [nom de l'epic]
 ```

### Création des tâches
Une fois l’Epic créer, il est possible de lié un / plusieurs ticket(s) enfant (tâche). Ces tâches peuvent permettre de découper le travail à faire pour un service qui serait trop conséquent exemple : 

Epic = service-mail
Tâche 1 : service-mail-forgotPassword
Tâche 2 : service-mail-withMedia
... 

#### Commit
Depuis la branche concernant l’Epic lié, il faut indiquer le ticket “tâche” concerné par le développement dans le commit : 



git commit -m "micro-mail-forgotPassword : ajout de la fonction de cryptage du mot de passe"

![Infrastructure plan](http://res.cloudinary.com/imrenagi-com/image/upload/v1494871114/Untitled_cwhlwy.png)
# Contributions

[(Back to top)](#table-of-contents)

Merci à Alizéa et Tchessi pour les contributions. :tada:












