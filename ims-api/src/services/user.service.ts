import { User } from "./../models/user.entity";
import { Repository } from "typeorm";

export class UserService {
  private userRepository: Repository<User>;

  constructor(userRepository: Repository<User>) {
    this.userRepository = userRepository;
  }

  public async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async createUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}
