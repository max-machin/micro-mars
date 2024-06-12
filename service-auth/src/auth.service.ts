import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  private readonly users = [
    { user: 'testUser', password: 'testPass' }, // Utilisateur de test
    // Vous pouvez ajouter plus d'utilisateurs ici ou récupérer les utilisateurs depuis une base de données
  ];

  async validateUser(user: string, password: string): Promise<boolean> {
    // Recherchez l'utilisateur dans la liste des utilisateurs
    const foundUser = this.users.find(
      (u) => u.user === user && u.password === password,
    );

    // Retournez true si l'utilisateur est trouvé et les informations d'identification sont correctes
    return !!foundUser;
  }
}
